import 'package:flutter/material.dart';
class codesnippet extends StatelessWidget {
  const codesnippet({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return const Placeholder(
      child: Text('Logo',
        style: TextStyle(
          color: GlobalColors.mainColor,
          fontSize: 35,
          fontWeight: FontWeight.bold,
        ),
      ),
    );
  }
}
