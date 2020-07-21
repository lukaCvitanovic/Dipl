<%@ Page Language="C#" %>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <title></title>
    <script src="<%= ResolveUrl("~/Script.js") %>"></script>
</head>
<body>
    <h1>XSS ranjivost u ASP .NET softverkom okviru</h1>
    Hello there
    .NET version: <%=Environment.Version%>
</body>
</html>