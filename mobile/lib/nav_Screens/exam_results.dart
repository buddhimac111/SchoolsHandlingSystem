import 'package:flutter/material.dart';
import 'package:new_folder/nav_Screens/profile_display.dart';

class ResultSheet extends StatelessWidget {
  const ResultSheet({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Results'),
        // centerTitle: true,
      ),
      body: SingleChildScrollView(
        child: Column(
          children: [
            const StdProfile(),
            const Padding(
              padding: EdgeInsets.all(16.0),
              child: Text(
                'Student Report Card',
                style: TextStyle(
                  fontSize: 20,
                  fontWeight: FontWeight.w800,
                ),
              ),
            ),
            Padding(
              padding: const EdgeInsets.all(8.0),
              child: Table(
                columnWidths: const {
                  0: FlexColumnWidth(2),
                  1: FlexColumnWidth(1),
                  2: FlexColumnWidth(1),
                  3: FlexColumnWidth(1),
                },
                border: TableBorder.all(
                  color: Colors.black,
                  width: 2,
                ),
                children: const [
                  TableRow(
                    children: [
                      Cells('Subject'),
                      Cells('1st Term'),
                      Cells('2nd Term'),
                      Cells('3rd Term'),
                    ],
                  ),
                  TableRow(
                    children: [
                      Cells('Maths'),
                      Cell('20',),
                      Cell('40'),
                      Cell('60'),
                    ],
                  ),
                  TableRow(
                    children: [
                      Cells('Science'),
                      Cell('30'),
                      Cell('40'),
                      Cell('60'),
                    ],
                  ),
                  TableRow(
                    children: [
                      Cells('English'),
                      Cell('100'),
                      Cell('90'),
                      Cell('60'),
                    ],
                  ),
                  TableRow(
                    children: [
                      Cells('Sinhala'),
                      Cell('50'),
                      Cell('40'),
                      Cell('30'),
                    ],
                  ),
                  TableRow(
                    children: [
                      Cells('Buddhism'),
                      Cell('10'),
                      Cell('10'),
                      Cell('10'),
                    ],
                  ),
                  TableRow(
                    children: [
                      Cells('History'),
                      Cell('40'),
                      Cell('80'),
                      Cell('90'),
                    ],
                  ),
                  TableRow(
                    children: [
                      Cells('Basket 1'),
                      Cell('31'),
                      Cell('42'),
                      Cell('69'),
                    ],
                  ),
                  TableRow(
                    children: [
                      Cells('Basket 2'),
                      Cell('90'),
                      Cell('80'),
                      Cell('70'),
                    ],
                  ),
                  TableRow(
                    children: [
                      Cells('Basket 3'),
                      Cell('33'),
                      Cell('44'),
                      Cell('66'),
                    ],
                  ),
                  TableRow(
                    children: [
                      Cellss('Total'),
                      Cellss('833'),
                      Cellss('844'),
                      Cellss('866'),
                    ],
                  ),
                  TableRow(
                    children: [
                      Cellss('Average'),
                      Cellss('8.3'),
                      Cellss('8.4'),
                      Cellss('8.6'),
                    ],
                  ),
                  TableRow(
                    children: [
                      Cellss('Place'),
                      Cellss('3'),
                      Cellss('2'),
                      Cellss('1'),
                    ],
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}

class Cell extends StatelessWidget {
  final String text;

  const Cell(this.text, {super.key});

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(8),
      child: Text(
        text,
        style: const TextStyle(fontSize: 15),
        textAlign: TextAlign.center,
      ),
    );
  }
}

class Cells extends StatelessWidget {
  final String text;

  const Cells(this.text, {super.key});

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(10),
      child: Text(
        text,
        style: const TextStyle(fontSize: 15, fontWeight: FontWeight.bold),
      ),
    );
  }
}

class Cellss extends StatelessWidget {
  final String text;

  const Cellss(this.text, {super.key});

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Container(
          padding: const EdgeInsets.all(10),
          child: Text(
            text,
            style: const TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
            textAlign: TextAlign.right,
          ),
        ),
      ],
    );
  }
}
