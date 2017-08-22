/***
 * Excerpted from "Serverless Single Page Apps",
 * published by The Pragmatic Bookshelf.
 * Copyrights apply to this code. It may not be used to create training material,
 * courses, books, articles, and the like. Contact us if you are in doubt.
 * We make no guarantees that this code is fit for any purpose.
 * Visit http://www.pragmaticprogrammer.com/titles/brapps for more book information.
***/
describe('lambda function', function() {
  var index = require('index');
  var context;

  beforeEach(function() {
    context = jasmine.createSpyObj('context', ['succeed', 'fail']);
    index.dynamodb = jasmine.createSpyObj('dynamo', ['scan']);
  });


  describe('echo', function() {
    it('returns a result', function() {
      index.echo({}, context);
      expected = ["Hello from the cloud! You sent {}"];
      expect(context.succeed).toHaveBeenCalledWith(expected);
    });
  });

  describe('popularAnswers', function() {
    it('requests problems with the given problem number', function() {
      index.popularAnswers({problemNumber: 42}, context);
      expect(index.dynamodb.scan).toHaveBeenCalledWith({
        FilterExpression: "problemId = :problemId",
        ExpressionAttributeValues: { ":problemId": 42 },
        TableName: 'learnjs'
      }, jasmine.any(Function));
    });

    it('groups answers by minified code', function() {
      index.popularAnswers({problemNumber: 1}, context);
      index.dynamodb.scan.calls.first().args[1](undefined, {Items: [
        {answer: "true"},
        {answer: "true"},
        {answer: "true"},
        {answer: "!false"},
        {answer: "!false"},
      ]});
      expect(context.succeed).toHaveBeenCalledWith({"true": 3, "!false": 2});
    });

    it('limits the results to the top five', function() {
      index.popularAnswers({problemNumber: 1}, context);
      index.dynamodb.scan.calls.first().args[1](undefined, {Items: [
        {answer: "1 === 1"},
        {answer: "1 === 1"},
        {answer: "2 === 2"},
        {answer: "2 === 2"},
        {answer: "2 === 2"},
        {answer: "3 === 3"},
        {answer: "3 === 3"},
        {answer: "4 === 4"},
        {answer: "4 === 4"},
        {answer: "5 === 5"},
        {answer: "5 === 5"},
        {answer: "!false"},
      ]});
      expect(context.succeed).toHaveBeenCalledWith({
        "1 === 1": 2,
        "2 === 2": 3,
        "3 === 3": 2,
        "4 === 4": 2,
        "5 === 5": 2});
    });

    it('fails the request if dynamo returns an error', function() {
      index.popularAnswers({problemNumber: 1}, context);
      index.dynamodb.scan.calls.first().args[1]('error');
      expect(context.fail).toHaveBeenCalledWith('error')
    });
  });
});
