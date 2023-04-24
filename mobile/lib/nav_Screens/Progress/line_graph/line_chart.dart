import 'package:fl_chart/fl_chart.dart';
import 'package:flutter/material.dart';
import 'package:new_folder/nav_Screens/Progress/line_graph/price_points.dart';

class LineChartWidget extends StatelessWidget {
  final List<PricePoint> pricePoints;
  final List<PricePoint1> pricePoints1;
  final List<PricePoint2> pricePoints2;
  const LineChartWidget(this.pricePoints, this.pricePoints1, this.pricePoints2, {super.key});

  @override
  Widget build(BuildContext context) {
    return AspectRatio(
      aspectRatio: 2,
      child: LineChart(
        LineChartData(
          maxY: 100,
          minY: 0,
          gridData: FlGridData(show: true),
          // borderData: FlBorderData(show: false),
          titlesData: FlTitlesData(
            show: true,
            topTitles: AxisTitles(sideTitles: SideTitles(showTitles: false)),
            // leftTitles: AxisTitles(sideTitles: SideTitles(showTitles: false)),
            // rightTitles: AxisTitles(sideTitles: SideTitles(showTitles: false)),
            bottomTitles: AxisTitles(
              sideTitles: SideTitles(
                showTitles: true,
                getTitlesWidget: getBottomTitles,
              ),
            ),
          ),
          lineBarsData: [
            LineChartBarData(
              spots:
                  pricePoints.map((point) => FlSpot(point.x.toDouble() , point.y)).toList(),
              isCurved: true,
              color: Colors.green,
              dotData: FlDotData(show: true),
            ),
            LineChartBarData(
              spots:
              pricePoints1.map((point) => FlSpot(point.x.toDouble() , point.y)).toList(),
              isCurved: true,
              color: Colors.pink,
              dotData: FlDotData(show: true),
            ),
            LineChartBarData(
              spots:
              pricePoints2.map((point) => FlSpot(point.x.toDouble() , point.y)).toList(),
              isCurved: true,
              // color: Colors.pink,
              dotData: FlDotData(show: true),
            ),
          ],
        ),
      ),
    );
  }
}
Widget getBottomTitles(double value, TitleMeta meta) {
  const style = TextStyle(
    color: Colors.grey,
    fontWeight: FontWeight.bold,
    fontSize: 14,
  );

  Widget text;
  switch (value.toInt()) {
    case 0:
      text = const Text("Sci", style: style,);
      break;
    case 1:
      text = const Text("Math", style: style,);
      break;
    case 2:
      text = const Text("Eng", style: style,);
      break;
    case 3:
      text = const Text("Sin", style: style,);
      break;
    case 4:
      text = const Text("Bud", style: style,);
      break;
    case 5:
      text = const Text("BS1", style: style,);
      break;
    case 6:
      text = const Text("BS2", style: style,);
      break;
    case 7 :
      text = const Text("BS3", style: style);
      break;
    case 8 :
      text = const Text("Other", style: style);
      break;
    default:
      text = const Text("",style: style);
  }
  return SideTitleWidget(axisSide: meta.axisSide, child: text);
}
