import 'package:flutter/material.dart';

class Result extends StatelessWidget {
  const Result({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.all(24.0),
      child: Column(
        children: const [
          Text(
            'Profile',
            style: TextStyle(
              fontSize: 40,
              color: Colors.black,
              fontWeight: FontWeight.bold,
            ),
          ),
          SizedBox(
            height: 100,
          ),
          CircleAvatar(
            radius: 70,
            child: Icon(Icons.person_2, size: 120),
          ),
          SizedBox(
            height: 100,
          ),
          Text(
            'Profile Content',
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
