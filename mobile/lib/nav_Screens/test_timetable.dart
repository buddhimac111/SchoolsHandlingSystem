import 'package:flutter/material.dart';
import 'package:new_folder/nav_Screens/profile_display.dart';

class SimpleTable extends StatelessWidget {
  // final List<List<String>> data;

  const SimpleTable({super.key});

  @override
  Widget build(BuildContext context) {
    return Table(
      border: TableBorder.all(),
      children: [
        TableRow(
          decoration: BoxDecoration(
            color: Colors.grey[300],
          ),
          children: const [
            TableCell(
              child: Padding(
                padding: EdgeInsets.all(8.0),
                child: Text(
                  'Time',
                  style: TextStyle(
                    fontWeight: FontWeight.bold,
                  ),
                ),
              ),
            ),
            TableCell(
              child: Center(
                child: Padding(
                  padding: EdgeInsets.all(8.0),
                  child: Text(
                    'Mon',
                    style: TextStyle(
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                ),
              ),
            ),
            TableCell(
              child: Padding(
                padding: EdgeInsets.all(8.0),
                child: Text(
                  'Tue',
                  style: TextStyle(
                    fontWeight: FontWeight.bold,
                  ),
                ),
              ),
            ),
            TableCell(
              child: Padding(
                padding: EdgeInsets.all(8.0),
                child: Text(
                  'Wed',
                  style: TextStyle(
                    fontWeight: FontWeight.bold,
                  ),
                ),
              ),
            ),
            TableCell(
              child: Padding(
                padding: EdgeInsets.all(8.0),
                child: Text(
                  'Thu',
                  style: TextStyle(
                    fontWeight: FontWeight.bold,
                  ),
                ),
              ),
            ),
            TableCell(
              child: Padding(
                padding: EdgeInsets.all(8.0),
                child: Text(
                  'Fri',
                  style: TextStyle(
                    fontWeight: FontWeight.bold,
                  ),
                ),
              ),
            ),
          ],
        ),
        // for (var row in data)
        const TableRow(
            children: [
              TableCell(
                child: Padding(
                  padding: EdgeInsets.only(top: 8.0, left: 4.0),
                  child: Text(
                    '7.30AM',
                    style: TextStyle(
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                ),
              ),
              TableCell(
                child: Padding(
                  padding: EdgeInsets.only(top: 15.0, left: 4.0),
                  child: Text('Science'),
                ),
              ),
              TableCell(
                child: Padding(
                  padding: EdgeInsets.only(top: 15.0, left: 8.0),
                  child: Text('Maths'),
                ),
              ),
              TableCell(
                child: Padding(
                  padding: EdgeInsets.only(top: 15.0, left: 6.0),
                  child: Text('English'),
                ),
              ),
              TableCell(
                child: Padding(
                  padding: EdgeInsets.only(top: 15.0, left: 6.0),
                  child: Text('Sinhala'),
                ),
              ),
              TableCell(
                child: Padding(
                  padding: EdgeInsets.only(top: 15.0, left: 5.0,bottom: 15.0),
                  child: Text('Religion'),
                ),
              ),
            ],
          ),
        const TableRow(
          children: [
            TableCell(
              child: Padding(
                padding: EdgeInsets.only(top: 15.0, left: 4.0, bottom: 15.0),
                child: Text(
                  '8.00AM',
                  style: TextStyle(
                    fontWeight: FontWeight.bold,
                  ),
                ),
              ),
            ),
            TableCell(
              child: Padding(
                padding: EdgeInsets.only(top: 15.0, left: 5.0,bottom: 15.0),
                child: Text('Religion'),
              ),
            ),
            TableCell(
              child: Padding(
                padding: EdgeInsets.only(top: 15.0, left: 6.0),
                child: Text('Sinhala'),
              ),
            ),
            TableCell(
              child: Padding(
                padding: EdgeInsets.only(top: 15.0, left: 6.0),
                child: Text('English'),
              ),
            ),
            TableCell(
              child: Padding(
                padding: EdgeInsets.only(top: 15.0, left: 8.0),
                child: Text('Maths'),
              ),
            ),
            TableCell(
              child: Padding(
                padding: EdgeInsets.only(top: 15.0, left: 4.0),
                child: Text('Science'),
              ),
            ),
          ],
        ),
        const TableRow(
          children: [
            TableCell(
              child: Padding(
                padding: EdgeInsets.only(top: 15.0, left: 4.0, bottom: 15.0),
                child: Text(
                  '9.00AM',
                  style: TextStyle(
                    fontWeight: FontWeight.bold,
                  ),
                ),
              ),
            ),
            TableCell(
              child: Padding(
                padding: EdgeInsets.only(top: 15.0, left: 8.0),
                child: Text('Maths'),
              ),
            ),
            TableCell(
              child: Padding(
                padding: EdgeInsets.only(top: 15.0, left: 4.0),
                child: Text('Science'),
              ),
            ),
            TableCell(
              child: Padding(
                padding: EdgeInsets.only(top: 15.0, left: 5.0,bottom: 15.0),
                child: Text('Religion'),
              ),
            ),
            TableCell(
              child: Padding(
                padding: EdgeInsets.only(top: 15.0, left: 5.0,bottom: 15.0),
                child: Text('Religion'),
              ),
            ),
            TableCell(
              child: Padding(
                padding: EdgeInsets.only(top: 15.0, left: 8.0),
                child: Text('Maths'),
              ),
            ),
          ]
        ),
        const TableRow(
            children: [
              TableCell(
                child: Padding(
                  padding: EdgeInsets.only(top: 15.0, left: 0.0, bottom: 15.0),
                  child: Text(
                    '10.00AM',
                    style: TextStyle(
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                ),
              ),
              TableCell(
                child: Padding(
                  padding: EdgeInsets.only(top: 15.0, left: 6.0),
                  child: Text('English'),
                ),
              ),
              TableCell(
                child: Padding(
                  padding: EdgeInsets.only(top: 15.0, left: 6.0),
                  child: Text('English'),
                ),
              ),
              TableCell(
                child: Padding(
                  padding: EdgeInsets.only(top: 15.0, left: 4.0),
                  child: Text('Science'),
                ),
              ),
              TableCell(
                child: Padding(
                  padding: EdgeInsets.only(top: 15.0, left: 8.0),
                  child: Text('Maths'),
                ),
              ),
              TableCell(
                child: Padding(
                  padding: EdgeInsets.only(top: 15.0, left: 6.0),
                  child: Text('Sinhala'),
                ),
              ),
            ]
        ),
        const TableRow(
            children: [
              TableCell(
                child: Padding(
                  padding: EdgeInsets.only(top: 15.0, left: 0.0,bottom: 15.0),
                  child: Text(
                    '11.00AM',
                    style: TextStyle(
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                ),
              ),
              TableCell(
                child: Padding(
                  padding: EdgeInsets.only(top: 15.0, left: 6.0),
                  child: Text('English'),
                ),
              ),
              TableCell(
                child: Padding(
                  padding: EdgeInsets.only(top: 15.0, left: 6.0),
                  child: Text('English'),
                ),
              ),
              TableCell(
                child: Padding(
                  padding: EdgeInsets.only(top: 15.0, left: 4.0),
                  child: Text('Science'),
                ),
              ),
              TableCell(
                child: Padding(
                  padding: EdgeInsets.only(top: 15.0, left: 8.0),
                  child: Text('Maths'),
                ),
              ),
              TableCell(
                child: Padding(
                  padding: EdgeInsets.only(top: 15.0, left: 6.0),
                  child: Text('Sinhala'),
                ),
              ),
            ]
        ),
        const TableRow(
            children: [
              TableCell(
                child: Padding(
                  padding: EdgeInsets.only(top: 15.0, left: 0.0, bottom: 15.0),
                  child: Text(
                    '12.00 AM',
                    style: TextStyle(
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                ),
              ),
              TableCell(
                child: Padding(
                  padding: EdgeInsets.all(8.0),
                  child: Text(''),
                ),
              ),
              TableCell(
                child: Padding(
                  padding: EdgeInsets.all(8.0),
                  child: Text(''),
                ),
              ),
              TableCell(
                child: Padding(
                  padding: EdgeInsets.all(8.0),
                  child: Text(''),
                ),
              ),
              TableCell(
                child: Padding(
                  padding: EdgeInsets.all(8.0),
                  child: Text(''),
                ),
              ),
              TableCell(
                child: Padding(
                  padding: EdgeInsets.all(8.0),
                  child: Text(''),
                ),
              ),
            ]
        ),
        const TableRow(
            children: [
              TableCell(
                child: Padding(
                  padding: EdgeInsets.only(top: 15.0, left: 4.0, bottom: 15.0),
                  child: Text(
                    '1.00PM',
                    style: TextStyle(
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                ),
              ),
              TableCell(
                child: Padding(
                  padding: EdgeInsets.only(top: 15.0, left: 6.0),
                  child: Text('English'),
                ),
              ),
              TableCell(
                child: Padding(
                  padding: EdgeInsets.only(top: 15.0, left: 6.0),
                  child: Text('English'),
                ),
              ),
              TableCell(
                child: Padding(
                  padding: EdgeInsets.only(top: 15.0, left: 4.0),
                  child: Text('Science'),
                ),
              ),
              TableCell(
                child: Padding(
                  padding: EdgeInsets.only(top: 15.0, left: 8.0),
                  child: Text('Maths'),
                ),
              ),
              TableCell(
                child: Padding(
                  padding: EdgeInsets.only(top: 15.0, left: 6.0),
                  child: Text('Sinhala'),
                ),
              ),
            ]
        ),
        const TableRow(
            children: [
              TableCell(
                child: Padding(
                  padding: EdgeInsets.only(top: 15.0, left: 4.0, bottom: 15.0),
                  child: Text(
                    '2.00PM',
                    style: TextStyle(
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                ),
              ),
              TableCell(
                child: Padding(
                  padding: EdgeInsets.only(top: 15.0, left: 6.0),
                  child: Text('English'),
                ),
              ),
              TableCell(
                child: Padding(
                  padding: EdgeInsets.only(top: 15.0, left: 6.0),
                  child: Text('English'),
                ),
              ),
              TableCell(
                child: Padding(
                  padding: EdgeInsets.only(top: 15.0, left: 4.0),
                  child: Text('Science'),
                ),
              ),
              TableCell(
                child: Padding(
                  padding: EdgeInsets.only(top: 15.0, left: 8.0),
                  child: Text('Maths'),
                ),
              ),
              TableCell(
                child: Padding(
                  padding: EdgeInsets.only(top: 15.0, left: 6.0),
                  child: Text('Sinhala'),
                ),
              ),
            ]
        ),
        const TableRow(
            children: [
              TableCell(
                child: Padding(
                  padding: EdgeInsets.only(top: 15.0, left: 4.0,bottom: 15.0),
                  child: Text(
                    '3.00PM',
                    style: TextStyle(
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                ),
              ),
              TableCell(
                child: Padding(
                  padding: EdgeInsets.only(top: 15.0, left: 6.0),
                  child: Text('English'),
                ),
              ),
              TableCell(
                child: Padding(
                  padding: EdgeInsets.only(top: 15.0, left: 6.0),
                  child: Text('English'),
                ),
              ),
              TableCell(
                child: Padding(
                  padding: EdgeInsets.only(top: 15.0, left: 4.0),
                  child: Text('Science'),
                ),
              ),
              TableCell(
                child: Padding(
                  padding: EdgeInsets.only(top: 15.0, left: 8.0),
                  child: Text('Maths'),
                ),
              ),
              TableCell(
                child: Padding(
                  padding: EdgeInsets.only(top: 15.0, left: 6.0),
                  child: Text('Sinhala'),
                ),
              ),
            ]
        ),
      ],
    );
  }
}

class NewTimeTable extends StatelessWidget {
  const NewTimeTable({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Time Table'),
        // centerTitle: true,
      ),
      body: Column(
        children: [
          const StdProfile(),
          Container(
            padding: const EdgeInsets.all(16.0),
            child: const SimpleTable(
              // data: [
              //   ['Maths', 'Science', 'Sinhala'],
              //   ['4', 'Religion', '6'],
              //   ['7', '8', '9'],
              //   ['Maths', 'Science', 'Sinhala'],
              //   ['4', 'Religion', '6'],
              //   ['7', '8', '9'],
              //   ['Maths', 'Science', 'Sinhala'],
              //   ['4', 'Religion', '6'],
              //   ['7', '8', '9'],
              //],
            ),
          ),
        ],
      ),
    );
  }
}


