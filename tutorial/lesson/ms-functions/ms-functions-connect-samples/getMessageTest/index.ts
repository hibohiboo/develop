export default  async function (context, req, messages) {
    context.log('Node.js Queue trigger function processed', context.bindings.messages);
    context.log('messages', messages);
    context.res.body = messages;
};