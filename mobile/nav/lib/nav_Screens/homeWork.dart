import 'package:flutter/material.dart';

class HomeWork extends StatelessWidget {
  const HomeWork({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.all(24.0),
      child: Column(
        children: const [
           Text(
              'HomeWork',
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
                Icons.book,
                size: 120
            ),
          ),
          SizedBox(height: 100,),
          Text(
            'HomeWork Content',
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
