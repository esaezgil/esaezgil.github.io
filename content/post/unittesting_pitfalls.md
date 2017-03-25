+++
title = "Unit-testing pitfalls & pytest basic features"
subtitle = ""
date = "2017-03-25T15:16:33+01:00"
bigimg = ""
+++

Lately, I have been answering some questions in [StackOverflow](http://stackoverflow.com/users/4378118/enrique?tab=profile) related to Unit Testing in Python with [Mock](http://www.voidspace.org.uk/python/mock/) and [pytest](http://doc.pytest.org/en/latest/). These are some of the questions I answered:
<!--more-->

 - [pytest and yield based tests](http://stackoverflow.com/questions/42676681/pytest-and-yield-based-tests/42753785#42753785)
 - [pytest: How to force raising Exceptions during unit-testing?](http://stackoverflow.com/questions/41314953/pytest-how-to-force-raising-exceptions-during-unit-testing/42753384#42753384)
 - [Mocking file open and throwing exception](http://stackoverflow.com/questions/42704292/mocking-file-open-and-throwing-exception/42707396#42707396)
 - [Avoiding a call to the database during tests](http://stackoverflow.com/questions/42631344/how-to-avoid-a-trip-to-the-database-in-this-test-case)
 - [Python how to test random choice](http://stackoverflow.com/questions/42788644/python-how-to-test-random-choice/42847033)
 - [Testing constructor using mock](http://stackoverflow.com/questions/42674971/testing-constructor-using-mock/42846459)
 - [Preset input for Unit tests in Python 3](http://stackoverflow.com/questions/42824059/preset-input-for-unit-tests-in-python-3/42827843)
 - [Mocking API calls in unit testing](http://stackoverflow.com/questions/42819073/mocking-api-calls-in-unit-testing/42820601)

Going through the list, there are some common pitfalls that can be identified related to the misunderstanding of basic python unit tests concepts and pytest features and inner workings. Inspired by a [similar post](http://alexmarandon.com/articles/python_mock_gotchas/) I recently bumped into, I will go through them in detail.

What does patch do?
===================

[Everything in Python is an object](http://www.diveintopython.net/getting_to_know_python/everything_is_an_object.html). As detailed in the [Python docs](https://docs.python.org/3/library/unittest.mock.html#quick-guide) the patch decorator/context manager allows to easily mocking classes/objects. Any class/object can be replaced with either a mock, or in general any other object, during the test and restored afterwards.

Therefore, patch allows to mock objects/calls in order to return predefined objects/constants/whatnot. This is really useful when testing system that interact with third parties, allowing for the removal of dependencies during tests.

Patching external dependencies
------------------------------

The following question, highlights precisely the aforementioned usage:

- [How to avoid a trip to the database in this Test case](http://stackoverflow.com/questions/42631344/how-to-avoid-a-trip-to-the-database-in-this-test-case/42794893#42794893)

``` python
from .models import ApplicationType

def get_application_type(self, value):
 item_name = "Application Type"
 self.base_details['application_type'] = None
 try:
     if value:
         try:
             result = ApplicationType.objects.get(title=value) # <= How do I avoid hitting this DB object?
             self.base_details['application_type'] = result.id
             return True
          except ApplicationType.DoesNotExist:
            [...]
         else:
           self.error_msg = "Blank Value: {}".format(item_name)
           return False
 except:
     raise
```

During unit-testing it is a requirement to avoid the interaction with a third-party service. In order to do so, we can use patch as follows (notice that this is for illustrative purposes and I do not necessarily agree with what and how it is being tested):

``` python
@pytest.mark.parametrize("entry", ['Type 1', 'Type 2'])
@patch('ApplicationType.objects.get')
def test_get_application_type_populates_dict_when_value_provided_exists_in_database(self, db_mocked_call, entry):
    mocked_db_object = {'id': 'test_id'}
    db_mocked_call.return_value = mocked_db_object
    application_type = ApplicationTypeFactory.build(title=entry)
    assert self.base_info_values.get_application_type(entry) == True
    assert self.base_info_values.base_details["application_type"] is not None
```

In the test above, it can be seen that the call to the database is being patched. Furthermore, a dictionary, `mocked_db_object`, will be returned when the call is made.

**This approach yields complete control over the inputs and outputs of our test and allowing to deterministically validate the code**. The usage of `parametrize` is reviewed in detail further below.

However, this does not imply that the integration with third-party services should not be tested through integration tests as I detailed in [my previous post about test driven APIs](http://esaezgil.com/post/test_driven_API/)

A similar example is the following one in which the calls to a the [Redis database](https://redis.io/) required patching:

- [Mocking API calls in unit testing](http://stackoverflow.com/questions/42819073/mocking-api-calls-in-unit-testing/42820601)

``` python

redispool = None

class myRedis(object):

  def __init__(self, redisHost, redisPort, redisDBNum):
      [...]

      global redispool
      redispool = redis.ConnectionPool(host=self._redishost,
                                            port=self._redisport,
                                            db=self._redisdb)

  def write_redis(self, key, value):
       retval = self._redis_instance.set(key, value)
       LOGGER.info('Writing data to redis (%s, %s). Retval=%s', key, value, retval)
       return retval
```

``` python
@mock.patch('redis.StrictRedis.set')
def test_myRedis_write(mock_strict_redis_set):
    mock_strict_redis_set.return_value = {}
    myRedisObj = myRedis('localhost', '8888', '11')
    redis_connect = myRedisObj.redis_connect()
    connect = myRedisObj.write_redis('1', '2')
    assert connect == {}
```

As the previous examples show, one of the most important concepts is knowing [where to patch](https://docs.python.org/3/library/unittest.mock.html#where-to-patch), which the linked docs explain quite clearly.

Finally, check the following question showing that checking the output of the calls being tested is not always required. Instead, what should be checked is that the calls took place with functions like `called_with` or `call_count`:
[Preset input for Unit tests in Python 3](http://stackoverflow.com/questions/42824059/preset-input-for-unit-tests-in-python-3/42827843)

Testing exceptions:
-------------------
One of the key behaviors to test are exception handling. As I suggested in this answer, the way to test that exceptions are raised is by patching the call that can raise the exception. This can be achieved through the `side_effect` function.

The next example shows how to force raising an exception to test that it is properly managed.

 - [Mocking file open and throwing exception](http://stackoverflow.com/questions/42704292/mocking-file-open-and-throwing-exception/42707396#42707396)

 ``` python

 def validate_json_specifications(path_to_data_folder, json_file_path, json_data) -> None:

     schema_file_path = os.path.join(path_to_data_folder, "schema", os.path.basename(json_file_path))
     resolver = RefResolver('file://' + schema_file_path, None)
     with open(schema_file_path) as schema_data:
         try:
             Draft4Validator(json.load(schema_data), resolver=resolver).validate(json_data)
         except ValidationError as e:
             print('...')
             exit()
 ```

The non-working tests for this code were as follows:

``` python
@patch('builtins.open', mock_open(read_data={}))
@patch('myproject.common.helper.jsonschema', Draft4Validator())
def test_validate_json_specifications(mock_file_open, draft_4_validator_mock):
    validate_json_specifications('foo_path_to_data', 'foo_json_file_path', {})
    mock_file_open.assert_called_with('foo_path_to_data/schema/foo_json_file_path')
    draft_4_validator_mock.assert_called()
```
The person asking was trying to use the patch wrong and not taking advantage of `side_effect`. As it can be seen, every time the `jsonschema` function of the module being tested was being called, a `Draft4Validator` object would have been created (had the class been correctly instantiated).

Instead, the Draft4Validator object is the one to be mocked and the relevant calls to any of its methods the ones to be patched.
An example of such way to proceed can be found in the answer I posted:

``` python

@patch('sys.exit')
@patch('myproject.common.helper.jsonschema.Draft4Validator')
@patch('builtins.open')
def test_validate_json_specifications(mock_file_open, draft_4_validator_mock, exit_mock):
    with pytest.raises(ValidationError):
        mock_file_open.return_value = {}
        draft_4_validator_mock = Mock()
        draft_4_validator_mock.side_effect = ValidationError

        validate_json_specifications('foo_path_to_data', 'foo_json_file_path', {})

        assert draft_4_validator_mock.call_count == 1
        assert draft_4_validator_mock.validate.assert_called_with({})        
        assert exit_mock.call_count == 1
```

In the previous test we can check again how easy it is to test the expected path for the exception through the creation of a mock object and associating a `side_effect` to it.


pytest basic features:
======================

[Pytest](pytest.org) is a very powerful testing framework and knowing about the feaures that it provides helps creating a robust and concise testing architecture for your project.

Some of the most common used features are the following:

Testing that exceptions are raised
-----------------------------------

Fortunately, pytest provides powerful features to test to [assert that exceptions are raised](). Some examples of wrong usage of such features ensues:

The next example shows how to force raising an exception and test that it actually raised:

 - [pytest: How to force raising Exceptions during unit-testing?](http://stackoverflow.com/questions/41314953/pytest-how-to-force-raising-exceptions-during-unit-testing/42753384#42753384)

 ``` python

 class MyRequest(metaclass=Singleton):

     def __init__(self, retry_tries=3, retry_backoff=0.1, retry_codes=None):
         [...]

     def request(self, request_method, request_url, **kwargs):
         try:
             return self.session.request(method=request_method, url=request_url, **kwargs)
         except Exception as ex:
             log.warning([...]])
             raise
```
The test could look something similar to the following:

``` python

from requests.exceptions import ConnectTimeout, ReadTimeout, Timeout
from unittest.mock import patch
import pytest

class TestRequestService:
    @pytest.mark.parametrize("expected_exception", [ConnectTimeout, ReadTimeout, Timeout])
    @patch('path_to_module.MyRequest')
    def test_custom_request(self, my_request_mock, expected_exception):
        my_request_mock.request.side_effect = expected_exception
        with pytest.raises(expected_exception):
            my_request_mock.request(Mock(), Mock())
    [...]
```

Notice how easily `side_effect` allows for the testing of the proper management of the exception.

pytest parametrize:
-------------------

One of the most sought after behaviors when testing is actually testing the correctness of a myriad of relevant inputs/outputs. For this purpose, pytest provides a feature that yields such flexibility in a compact way through `parametrize`. The following questions are scenarios in which `parametrize` is highly relevant:

 - [pytest and yield based tests](http://stackoverflow.com/questions/42676681/pytest-and-yield-based-tests/42753785#42753785)

``` python

 def is_equal(a, b):
    assert a == b
```

We can test such a simple scenario with some tests:

``` python

import pytest

class TestComplexScenario:
    @pytest.mark.parametrize("my_integer", [0, 1, 2])
    def test_complex(self, my_integer):
        assert is_equal(my_integer, my_integer)
```

The sample output looks like this:

``` bash
test_complex.py::TestComplexScenario::test_complex[0] PASSED
test_complex.py::TestComplexScenario::test_complex[1] PASSED
test_complex.py::TestComplexScenario::test_complex[2] PASSED
```
where it can be checked that all the inputs were tested.
