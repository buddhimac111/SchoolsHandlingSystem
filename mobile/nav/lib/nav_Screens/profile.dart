import 'package:flutter/material.dart';

class Profile extends StatelessWidget {

  const Profile({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Profile'),
      ),
      body: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          // Padding(
          //   padding: EdgeInsets.all(16.0),
          //   child: Image.network(
          //     // profilePicture,
          //     width: 100,
          //     height: 100,
          //     fit: BoxFit.cover,
          //   ),
          // ),
          Padding(
            padding: EdgeInsets.all(16.0),
            child: Text(
              'Name: name',
              style: TextStyle(fontSize: 24.0),
            ),
          ),
          Padding(
            padding: EdgeInsets.all(16.0),
            child: Text(
              'Class: classOfUser',
              style: TextStyle(fontSize: 24.0),
            ),
          ),
          Padding(
            padding: EdgeInsets.all(16.0),
            child: Text(
              'Age: age',
              style: TextStyle(fontSize: 24.0),
            ),
          ),
          Padding(
            padding: EdgeInsets.all(16.0),
            child: Text(
              'Index Number: indexNumber',
              style: TextStyle(fontSize: 24.0),
            ),
          ),
        ],
      ),
    );
  }
}

