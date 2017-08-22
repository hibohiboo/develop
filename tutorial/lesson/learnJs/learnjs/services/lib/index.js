/***
 * Excerpted from "Serverless Single Page Apps",
 * published by The Pragmatic Bookshelf.
 * Copyrights apply to this code. It may not be used to create training material,
 * courses, books, articles, and the like. Contact us if you are in doubt.
 * We make no guarantees that this code is fit for any purpose.
 * Visit http://www.pragmaticprogrammer.com/titles/brapps for more book information.
***/
var http = require('http');
var AWS = require('aws-sdk');

AWS.config.region = 'us-east-1';

var config = {
  dynamoTableName: 'learnjs',
};

exports.dynamodb = new AWS.DynamoDB.DocumentClient();

function reduceItems(memo, items) {
  items.forEach(function(item) {
    memo[item.answer] = (memo[item.answer] || 0) + 1;
  });
  return memo;
}

function byCount(e1, e2) {
  return e2[0] - e1[0];
}

function filterItems(items) {
  var values = [];
  for (i in items) {
    values.push([items[i], i]);
  }
  var topFive = {};
  values.sort(byCount).slice(0,5).forEach(function(e) {
    topFive[e[1]] = e[0];
  })
  return topFive;
}

exports.popularAnswers = function(json, context) {
  exports.dynamodb.scan({
    FilterExpression: "problemId = :problemId",
    ExpressionAttributeValues: {
      ":problemId": json.problemNumber
    },
    TableName: config.dynamoTableName
  }, function(err, data) {
    if (err) {
      context.fail(err);
    } else {
      context.succeed(filterItems(reduceItems({}, data.Items)));
    }
  });
};

exports.echo = function(json, context) {  
  context.succeed(["Hello from the cloud! You sent " + JSON.stringify(json)]);
};
