
function empty_Table()
{
    document.write("<table id=\"myTable\" >");
    for (var i = 0; i<=10; i++)
    {
        document.write("<tr>");
        if(i == 0)
        {
            document.write("<th>Index</th>");
            document.write("<th>Humidity</th>");
            document.write("<th>Temperature</th>");
        }
        else
        {
            document.write("<td></td>");
            document.write("<td></td>");
            document.write("<td></td>");
        }
        document.write("</tr>");
    }
    document.write("</table>");
    return;
}

empty_Table();