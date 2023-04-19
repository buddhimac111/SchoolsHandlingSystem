import 'package:flutter/material.dart';
import 'package:charts_flutter_new/flutter.dart' as charts;

class Progress extends StatelessWidget {
  Progress({Key? key}) : super(key: key);
  final List<BarChartModel> data =[
    BarChartModel(
      subject: "Maths",
      score: 20,
      color: charts.ColorUtil.fromDartColor(Colors.blueGrey),
    ),
    BarChartModel(
      subject: "Science",
      score: 90,
      color: charts.ColorUtil.fromDartColor(Colors.red),
    ),
    BarChartModel(
      subject: "Sinhala",
      score: 20,
      color: charts.ColorUtil.fromDartColor(Colors.green),
    ),
    BarChartModel(
      subject: "Buddhism",
      score: 90,
      color: charts.ColorUtil.fromDartColor(Colors.yellow),
    ),
    BarChartModel(
      subject: "History",
      score: 60,
      color: charts.ColorUtil.fromDartColor(Colors.purple),
    ),
    BarChartModel(
      subject: "Basket 1",
      score: 70,
      color: charts.ColorUtil.fromDartColor(Colors.pink),
    ),
    BarChartModel(
      subject: "Basket 2",
      score: 80,
      color: charts.ColorUtil.fromDartColor(Colors.black),
    ),
    BarChartModel(
      subject: "Basket 3",
      score: 90,
      color: charts.ColorUtil.fromDartColor(Colors.orange),
    ),
  ];

  @override
  Widget build(BuildContext context) {

    List<charts.Series<BarChartModel, String>> series = [
      charts.Series(
        id: "score",
        data: data,
        domainFn: (BarChartModel series, _) => series.subject,
        measureFn: (BarChartModel series, _) => series.score,
        colorFn: (BarChartModel series, _) => series.color,
      ),
    ];
    return Scaffold(
      appBar: AppBar(
        title: const Text('Progress'),
      ),
      body: Container(
        padding: const EdgeInsets.all(10.0),
        child: charts.BarChart(
          series,
          animate: true,
        ),
      ),
    );
  }
}
class BarChartModel {
  String subject;
  int score;
  final charts.Color color;

  BarChartModel({
    required this.subject,
    required this.score,
    required this.color,
  });
}
