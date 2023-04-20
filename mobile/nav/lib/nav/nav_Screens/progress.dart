import 'package:flutter/material.dart';

class Progress extends StatelessWidget {
  const Progress({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.all(24.0),
      child: Column(
        children: const [
           Text(
              'Progress',
              style: TextStyle(
                fontSize: 40,
                color: Colors.black,
                fontWeight: FontWeight.bold,
              ),
          ),
          SizedBox(height: 100,),
          CircleAvatar(
            radius: 70,
            child: Icon(
                Icons.bar_chart,
                size: 120
            ),
          ),
          SizedBox(height: 100,),
          Text(
            'Progress Content',
            style: TextStyle(
              fontSize: 30,
              color: Colors.black,
            ),
          ),
        ],
      ),
    );
  }
}
