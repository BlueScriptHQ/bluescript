<!DOCTYPE html>
<html lang="nl">
  <head>
    <meta charset="utf-8">
    <title>Statistieken</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="css/s_pages.min.css" media="screen" title="no title">
    <link rel="stylesheet" href="css/tabel.min.css">
  </head>

  <body>

    <?php
    require_once "../php/connection.php";

    $query="SELECT pages_name, pages_count FROM pages ORDER BY pages_count DESC";

    $stmt = $conn->query($query);

    $result = $stmt->fetchAll();



     ?>


     <!-- Styles -->
    <style>
    #chartdiv {
    	width		: 100%;
    	height		: 500px;
    	font-size	: 11px;
    }
    </style>

    <!-- Resources -->
    <script src="../js/charts.js"></script>
    <script src="../js/serial.js"></script>
    <script src="../js/export.js"></script>
    <link rel="stylesheet" href="../css/charts.css" type="text/css" media="all" />
    <script src="../js/theme.js"></script>

    <!-- Chart code -->
    <script>
    var chart = AmCharts.makeChart( "chartdiv", {
      "type": "serial",
      "theme": "light",
      "dataProvider": [
        <?php
          foreach($result as $row){
            echo "{ country: '".$row['pages_name']."', visits: ".$row['pages_count']."},";
          }
        ?>
      ],
      "gridAboveGraphs": true,
      "startDuration": 1,
      "graphs": [ {
        "balloonText": "[[category]]: <b>[[value]]</b>",
        "fillAlphas": 0.8,
        "lineAlpha": 0.2,
        "type": "column",
        "valueField": "visits"
      } ],
      "chartCursor": {
        "categoryBalloonEnabled": false,
        "cursorAlpha": 0,
        "zoomable": false
      },
      "categoryField": "country",
      "categoryAxis": {
        "gridPosition": "start",
        "gridAlpha": 0,
        "tickPosition": "start",
        "tickLength": 20
      },
      "export": {
        "enabled": true
      }

    } );
    </script>

    <!-- HTML -->
    <div id="chartdiv"></div>
    <table>
      <tr>
        <th>Paginanaam</th>
        <th class="tCount">Paginacount</th>
      </tr>
      <?php foreach($result as $row){
        echo "<tr>
        <td>".$row['pages_name']." \n </td>
        <td class='tCount'>".$row['pages_count']." \n </td>
        </tr>";
      }?>
    </table>

    <!--Vendor scripts-->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.0/jquery.min.js"></script>
    <!--Custom scripts-->

  </body>
</html>
