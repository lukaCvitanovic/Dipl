<% for(var i = 0; i< posts.length; i++) { %>
    var a = "<%-posts[i]%>"
    document.getElementById('dom_posts').innerHTML += a
<% } %>