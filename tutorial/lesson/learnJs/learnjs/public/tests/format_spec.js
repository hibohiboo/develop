var formattedProblems = [];

learnjs.problems.foreach((problem)=>{
  formattedProblems.push({
    code: learnjs.formatCode(problem.code),
    name: problem.name
  });
});

return formattedProblems;