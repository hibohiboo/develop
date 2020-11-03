// https://docs.microsoft.com/ja-jp/azure/storage/tables/table-storage-overview
// https://docs.microsoft.com/ja-jp/azure/azure-functions/functions-bindings-storage-table-input?tabs=javascript
export default  async function (context, req, messages) {
    context.log('context messages', context.bindings.messages);
    context.log('messages', messages);
    context.res.body = messages;
};