import 'package:curved_navigation_bar/curved_navigation_bar.dart';
import 'package:device_preview/device_preview.dart';
import 'package:flutter/material.dart';
import 'package:nav/nav_Screens/homeWork.dart';
import 'package:nav/nav_Screens/profile.dart';
import 'package:nav/nav_Screens/progress.dart';
import 'package:nav/nav_Screens/settings.dart';

import 'nav_Screens/home.dart';


void main() => runApp(
  DevicePreview(
    builder: (context) => const MyApp(), // Wrap your app
  ),
);

class MyApp extends StatelessWidget {
  const MyApp({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      theme: ThemeData(
        brightness: Brightness.light,
      ),
      locale: DevicePreview.locale(context),
      builder: DevicePreview.appBuilder,
      debugShowCheckedModeBanner: false,
      home: const Home(),
    );
  }
}

class Home extends StatefulWidget {
  const Home({Key? key}) : super(key: key);

  @override
  State<Home> createState() => _HomeState();
}

class _HomeState extends State<Home> {

  final items = const [
    Icon(Icons.settings),
    Icon(Icons.book),
    Icon(Icons.home),
    Icon(Icons.bar_chart),
    Icon(Icons.person_2),
  ];

  int index = 1;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.white,
      appBar: AppBar(
        title: const Text(
            'Student',
          style: TextStyle(
            fontSize: 30,
          ),
        ),

        leading: IconButton(
          icon: const Icon(Icons.search, size: 35,),
          onPressed: (){},
        ),
        actions: [
          IconButton(
            icon: const Icon(Icons.more_vert,size: 35,),
            onPressed: (){},
          ),
        ],
      ),
      bottomNavigationBar: CurvedNavigationBar(
        items: items,
        index: index,
        color: Colors.blue,
        onTap: (selectedIndex) {
          setState(() {
            index = selectedIndex;
          });
        },
        height: 70,
        backgroundColor: Colors.transparent,
        animationDuration: const Duration(milliseconds: 300),
      ),
      body: Container(
        color: Colors.white,
        width: double.infinity,
        height: double.infinity,
        alignment: Alignment.center,
        child: getSelectedWidget(index: index)
      ),
    );
  }

  Widget getSelectedWidget({required int index}) {
    Widget widget;
    switch(index){
      case 0:
        widget = const Settings();
        break;
      case 1:
        widget = const HomeWork();
        break;
      case 2:
        widget = const StHome();
        break;
      case 3:
        widget = const Progress();
        break;
      case 4:
        widget = const Profile();
        break;
      default:
        widget = const StHome();
        break;

    }
    return widget;
  }
}


