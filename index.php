<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>

    <script src='https://code.jquery.com/jquery-2.1.3.min.js'></script>
    <script>
        loadData();
        setInterval(function() {
            loadData()
        }, 1000);

        function loadData() {
            try {
                $.ajax({
                    url: 'fetchData.php', })
                    .done(function(result) {
                        var string = '<table border="1"><tr><th>Name</th> <th>Email</th> <th>Message</th> <th>Date</th></tr>';
                        $.each(result, function(key, value) {
                            string += "<tr><td>" + value['name'] + "</td> <td> " + value['email'] + '<td> ' + value['message'] + '</td> <td> ' + value['date'] + "</td> </tr>";
                        });
                        string += '</table>';
                        $('#dataDiv').html(string);
                    });
               
            } catch (e) {
                console.log(e)
            }
        };
    </script>
</head>

<body>
    <div id="dataDiv"></div>
</body>

</html>