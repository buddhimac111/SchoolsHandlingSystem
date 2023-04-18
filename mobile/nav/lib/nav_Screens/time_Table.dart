import 'package:flutter/material.dart';

class TimeTable extends StatelessWidget {
  const TimeTable({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Time Table'),
      ),
      body: SingleChildScrollView(
        child: Table(
          columnWidths: const {
            0: FlexColumnWidth(1),
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
                Cells('Time'),
                Cells('Mon day'),
                Cells('Tues day'),
                Cells('Wednes day'),
                Cells('Thurs day'),
                Cells('Fri day'),
              ],
            ),
            TableRow(
              children: [
                Cell('7:00 AM'),
                Cell('Math'),
                Cell('Science'),
                Cell('English'),
                Cell('Science'),
                Cell('English'),
              ],
            ),
            TableRow(
              children: [
                Cell('8:00 AM'),
                Cell('Science'),
                Cell('English'),
                Cell('Math'),
                Cell('English'),
                Cell('Math'),
              ],
            ),
            TableRow(
              children: [
                Cell('9:00 AM'),
                Cell('English'),
                Cell('Math'),
                Cell('Science'),
                Cell('Math'),
                Cell('Science'),
              ],
            ),
            TableRow(
              children: [
                Cell('10:00 AM'),
                Cell('English'),
                Cell('Math'),
                Cell('Science'),
                Cell('Math'),
                Cell('Science'),
              ],
            ),
            TableRow(
              children: [
                Cell('11:00 AM'),
                Cell('English'),
                Cell('Math'),
                Cell('Science'),
                Cell('Math'),
                Cell('Science'),
              ],
            ),
            TableRow(
              children: [
                Cell('12:00 PM'),
                Cell('English'),
                Cell('Math'),
                Cell('Science'),
                Cell('Math'),
                Cell('Science'),
              ],
            ),
            TableRow(
              children: [
                Cell('1:00 PM'),
                Cell('English'),
                Cell('Math'),
                Cell('Science'),
                Cell('Math'),
                Cell('Science'),
              ],
            ),
            TableRow(
              children: [
                Cell('2:00 PM'),
                Cell('English'),
                Cell('Math'),
                Cell('Science'),
                Cell('Math'),
                Cell('Science'),
              ],
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
        style: const TextStyle(fontSize: 18),
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
        style: const TextStyle(
            fontSize: 20,
            fontWeight: FontWeight.bold
        ),
      ),
    );
  }
}
