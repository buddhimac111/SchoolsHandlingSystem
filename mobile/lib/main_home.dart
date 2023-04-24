import 'package:curved_navigation_bar/curved_navigation_bar.dart';
import 'package:device_preview/device_preview.dart';
import 'package:flutter/material.dart';
import 'package:new_folder/login/view/login.view.dart';
import 'package:new_folder/nav_Screens/Progress/bargraph.dart';
import 'package:new_folder/nav_Screens/dash.dart';
import 'package:new_folder/nav_Screens/exam_results.dart';
import 'package:new_folder/nav_Screens/faq.dart';
import 'package:new_folder/nav_Screens/logout.dart';
import 'package:new_folder/nav_Screens/my_profile/profile.dart';
import 'package:new_folder/nav_Screens/profile.dart';
import 'package:new_folder/nav_Screens/settings.dart';
import 'package:new_folder/nav_Screens/test_timetable.dart';
import 'nav_Screens/Progress/bargraph.dart';
import 'nav_Screens/dash.dart';
import 'nav_Screens/exam_results.dart';
import 'nav_Screens/faq.dart';
import 'nav_Screens/logout.dart';
import 'nav_Screens/my_profile/profile.dart';
import 'nav_Screens/progress.dart';
import 'nav_Screens/results.dart';
import 'nav_Screens/test_timetable.dart';
import 'nav_Screens/time_Table.dart';

class Home extends StatefulWidget {
  const Home({Key? key}) : super(key: key);

  @override
  State<Home> createState() => _HomeState();
}

class _HomeState extends State<Home> {
  final items = const [
    Icon(Icons.table_chart),
    Icon(Icons.bar_chart),
    Icon(Icons.home),
    Icon(Icons.newspaper),
    Icon(Icons.person_2),
  ];

  int index = 2;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.white,
      appBar: AppBar(
        title: const Text(
          'Student Mate',
          style: TextStyle(
            fontSize: 25,
          ),
        ),
        centerTitle: true,
        leading: Padding(
          padding: const EdgeInsets.all(8.0),
          child: Container(
            child: ClipRRect(
              borderRadius: BorderRadius.circular(200.0),
                child: Image.asset('assets/hh.jpg'),
            ),
          ),
        ),
        actions: [
          PopupMenuButton<MenuItem>(
              onSelected: (value) {
                if (value == MenuItem.item1) {
                  Navigator.of(context).push(
                    MaterialPageRoute(
                      builder: (context) => const FaqPage(),
                    ),
                  );
                } else if (value == MenuItem.item2) {
                  Navigator.of(context).push(
                    MaterialPageRoute(
                      builder: (context) => LoginView(),
                    ),
                  );
                }
              },
              itemBuilder: (context) => [
                    PopupMenuItem(
                      value: MenuItem.item1,
                      child: Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: const [
                          Expanded(
                            child: Text(
                              'Faq',
                              textAlign: TextAlign.left,
                            ),
                          ),
                          Icon(
                            Icons.help,
                            color: Colors.blue,
                          ),
                        ],
                      ),
                    ),
                    PopupMenuItem(
                      value: MenuItem.item2,
                      child: Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: const [
                          Expanded(
                            child: Text(
                              'Log Out',
                              textAlign: TextAlign.left,
                            ),
                          ),
                          Icon(
                            Icons.logout,
                            color: Colors.blue,
                          ),
                        ],
                      ),
                    ),
                  ])
        ],
      ),
      // appBar: AppBar(),
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
          child: getSelectedWidget(index: index)),
    );
  }

  Widget getSelectedWidget({required int index}) {
    Widget widget;
    switch (index) {
      case 0:
        widget = const ResultSheet();
        break;
      case 1:
        widget = const BarGraph();
        break;
      case 2:
        widget = const Dashboard();
        break;
      case 3:
        widget = const NewTimeTable();
        break;
      case 4:
        widget = const NewProfile();
        break;
      default:
        widget = const Dashboard();
        break;
    }
    return widget;
  }
}

enum MenuItem {
  item1,
  item2,
}
