import 'package:flutter/material.dart';
import 'package:fl_chart/fl_chart.dart';
import 'bar_data.dart';


class MyBarGraph extends StatelessWidget {
  final List weeklySummery;
  const MyBarGraph({Key? key, required this.weeklySummery}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    BarData myBarData = BarData(
      scienceAmount: weeklySummery[0],
      mathsAmount: weeklySummery[1],
      englishAmount: weeklySummery[2],
      sinhalaAmount: weeklySummery[3],
      buddhismAmount: weeklySummery[4],
      bascket1Amount: weeklySummery[5],
      bascket2Amount: weeklySummery[6],
      bascket3Amount: weeklySummery[7],
    );
    myBarData.initializeBarData();

    return BarChart(
      BarChartData(
          maxY: 100,
          minY: 0,
          gridData: FlGridData(show: false),
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
          barGroups: myBarData.barData.map((data) => BarChartGroupData(
                x: data.x,
                barRods: [
                  BarChartRodData(
                      toY: data.y,
                      color: Colors.blueAccent,
                    width: 15,
                    borderRadius: BorderRadius.circular(4),
                    backDrawRodData: BackgroundBarChartRodData(
                      show: true,
                      toY: 100,
                      color: Colors.grey[200],
                    ),
                  ),
                ],
              ),
          )
          .toList(),
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
        default:
          text = const Text("",style: style);
      }
      return SideTitleWidget(axisSide: meta.axisSide, child: text);
    }

