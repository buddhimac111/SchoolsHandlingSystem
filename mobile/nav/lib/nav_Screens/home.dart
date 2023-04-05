import 'package:flutter/material.dart';

class StHome extends StatelessWidget {
  const StHome({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.all(24.0),
      child: Column(
        children: const [
           Text(
              'Dashboard',
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
                Icons.home,
                size: 120
            ),
          ),
          SizedBox(height: 100,),
          Text(
            'Home Content',
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
