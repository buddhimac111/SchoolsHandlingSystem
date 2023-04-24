import 'package:flutter/material.dart';
import 'package:fl_chart/fl_chart.dart';
import '../profile_display.dart';
import 'bar_Graph/bar_graph.dart';
import 'line_graph/line_chart.dart';
import 'line_graph/price_points.dart';

class BarGraph extends StatefulWidget {
  const BarGraph({Key? key}) : super(key: key);

  @override
  State<BarGraph> createState() => _BarGraphState();
}

class _BarGraphState extends State<BarGraph> {
  List<double> weeklySummary = [
    84.40,
    72.50,
    84.42,
    63.60,
    52.50,
    100.00,
    98.90,
    90.00,
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text("Progress"),
        // centerTitle: true,
      ),
      body: SingleChildScrollView(
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const StdProfile(),
            const Divider(),
            const SingleChildScrollView(
              scrollDirection: Axis.vertical,
              child: Padding(
                padding: EdgeInsets.only(top: 16.0, left: 16.0),
                child: Center(
                  child: Text(
                    "Term Test Results",
                    style: TextStyle(
                      fontSize: 24.0,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                ),
              ),
            ),
            const SizedBox(height: 3),
            const Divider(
              thickness: 1.0,
            ),
            const SizedBox(height: 8,),
            SizedBox(
              height: 350,
              child: MyBarGraph(
                weeklySummery: weeklySummary,
              ),
            ),

            const Divider(
              thickness: 1.0,
            ),

            const Padding(
              padding: EdgeInsets.only(top: 3.0, left: 16.0),
              child: Center(
                child: Text(
                  "Year Results",
                  style: TextStyle(
                    fontSize: 24.0,
                    fontWeight: FontWeight.bold,
                  ),
                ),
              ),
            ),
            const SizedBox(height: 8,),
            Padding(
              padding: EdgeInsets.only(top: 6.0, left: 16.0),
              child: Column(
                children: [
                  Row(
                    children: const [
                      Padding(
                        padding: EdgeInsets.only(left: 30.0,right: 28.0),
                        child: Text(
                          "First Term",
                          style: TextStyle(
                            fontSize: 14.0,
                            fontWeight: FontWeight.bold,
                            color: Colors.pink,
                          ),
                        ),
                      ),
                      Padding(
                        padding: EdgeInsets.only(left: 30.0, right: 8.0),
                        child: Text(
                          "Second Term",
                          style: TextStyle(
                            fontSize: 14.0,
                            fontWeight: FontWeight.bold,
                            color: Colors.cyan,
                          ),
                        ),
                      ),
                      Padding(
                        padding: EdgeInsets.only(left: 30.0, right: 8.0),
                        child: Text(
                          "Third Term",
                          style: TextStyle(
                            fontSize: 14.0,
                            fontWeight: FontWeight.bold,
                            color: Colors.green,
                          ),
                        ),
                      ),
                    ],
                  ),
                ],
              ),
            ),
            const Divider(),
            const SizedBox(height: 8,),
            SizedBox(
              height: 350,
              child: LineChartWidget(pricePoints, pricePoints1,pricePoints2),
            ),
            const SizedBox(height: 20.0,),
          ],
        ),
      ),
    );
  }
}
