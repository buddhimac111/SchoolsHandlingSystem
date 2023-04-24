import 'package:flutter/material.dart';
import 'package:new_folder/main_home.dart';
import 'package:new_folder/nav_Screens/exam_results.dart';
import 'package:new_folder/nav_Screens/my_profile/profile.dart';
import 'package:new_folder/nav_Screens/profile.dart';
import 'package:new_folder/nav_screens/results.dart';
import 'package:new_folder/nav_Screens/profile_display.dart';
import 'package:new_folder/nav_Screens/test_timetable.dart';
import 'Progress/bargraph.dart';
import 'exam_results.dart';
import 'my_profile/profile.dart';

class Dashboard extends StatelessWidget {
  const Dashboard({Key? key}) : super(key: key);


  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text("Dashboard"),
        // centerTitle: true,
      ),
      body: SingleChildScrollView(
        child: SafeArea(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.start,
            children: [
              const StdProfile(),
              const Divider(),
              Padding(
                padding: const EdgeInsets.all(8.0),
                child: Container(
                  // width: double.infinity,
                  // height: 150,
                  decoration: const BoxDecoration(
                    color: Color.fromARGB(255, 102, 189, 234),
                    borderRadius: BorderRadius.only(
                      bottomLeft: Radius.circular(8.0),
                      bottomRight: Radius.circular(8.0),
                      topLeft: Radius.circular(8.0),
                      topRight: Radius.circular(8.0),
                    ),
                  ),
                  child: const Padding(
                    padding: EdgeInsets.all(12.0),
                    child: Image(image: AssetImage('assets/kk.jpg'),
                    ),

                  ),
                ),
              ),
              // const SizedBox(height: 180),
              // const Divider(),
              // Container(
              //   // color: Colors.cyan,
              //   width: double.infinity,
              //   height: 150,
              //   decoration: const BoxDecoration(
              //     color: Colors.blue,
              //     borderRadius: BorderRadius.only(
              //       bottomLeft: Radius.circular(20.0 * 2),
              //       bottomRight: Radius.circular(20.0 * 2),
              //     ),
              //   ),
              //   child: Row(
              //     mainAxisAlignment: MainAxisAlignment.center,
              //     children: [
              //       const CircleAvatar(
              //         maxRadius: 50.0,
              //         minRadius: 50.0,
              //         backgroundColor: Colors.cyan,
              //         backgroundImage: AssetImage("assets/Hello.jpeg"),
              //       ),
              //       const SizedBox(
              //         width: 20.0,
              //       ),
              //       Column(
              //         crossAxisAlignment: CrossAxisAlignment.start,
              //         mainAxisAlignment: MainAxisAlignment.center,
              //         children: const [
              //           Text(
              //             "Buddhima Wijesooriya",
              //             style:
              //             TextStyle(fontSize: 24, fontWeight: FontWeight.bold),
              //           ),
              //           Text(
              //             "Class 13 A1",
              //             style: TextStyle(fontSize: 20),
              //           ),
              //         ],
              //       ),
              //     ],
              //   ),
              // ),
              const Divider(),
              Column(
                mainAxisAlignment: MainAxisAlignment.end,
                children: [
                  Padding(
                    padding: const EdgeInsets.all(2.0),
                    child: Center(
                      child: Wrap(
                        spacing: 20.0,
                        runSpacing: 20.0,
                        children: [
                          Row(
                            mainAxisAlignment: MainAxisAlignment.spaceAround,
                            children: [
                              SizedBox(
                                width: 190.0,
                                height: 113.0,
                                child: InkWell(
                                  onTap: () {
                                    Navigator.push(
                                        context,
                                        MaterialPageRoute(
                                            builder: (context) => const ResultSheet()));
                                  },
                                  splashColor: Colors.blue,
                                  child: Card(
                                    color: Colors.blue,
                                    elevation: 2.0,
                                    shape: RoundedRectangleBorder(
                                        borderRadius: BorderRadius.circular(8.0)),
                                    child: Center(
                                      child: Padding(
                                        padding: const EdgeInsets.all(8.0),
                                        child: Column(
                                          children: const [
                                            Icon(
                                              Icons.table_chart,
                                              size: 45.0,
                                            ),
                                            SizedBox(height: 10.0),
                                            Text(
                                              "Exam Results",
                                              style: TextStyle(
                                                color: Colors.white,
                                                fontWeight: FontWeight.bold,
                                                fontSize: 25.0,
                                              ),
                                            ),
                                          ],
                                        ),
                                      ),
                                    ),
                                  ),
                                ),
                              ),
                              SizedBox(
                                width: 190.0,
                                height: 113.0,
                                child: InkWell(
                                  onTap: () {
                                    Navigator.push(
                                        context,
                                        MaterialPageRoute(
                                            builder: (context) => const NewTimeTable()));
                                  },
                                  child: Card(
                                    color: Colors.blue,
                                    elevation: 2.0,
                                    shape: RoundedRectangleBorder(
                                        borderRadius: BorderRadius.circular(8.0)),
                                    child: Center(
                                      child: Padding(
                                        padding: const EdgeInsets.all(8.0),
                                        child: Column(
                                          children: const [
                                            Icon(
                                              Icons.newspaper,
                                              size: 45.0,
                                            ),
                                            SizedBox(height: 10.0),
                                            Text(
                                              "Time Table",
                                              style: TextStyle(
                                                color: Colors.white,
                                                fontWeight: FontWeight.bold,
                                                fontSize: 25.0,
                                              ),
                                            ),
                                          ],
                                        ),
                                      ),
                                    ),
                                  ),
                                ),
                              ),
                            ],
                          ),
                          Row(
                            mainAxisAlignment: MainAxisAlignment.spaceAround,
                            children: [
                              SizedBox(
                                width: 190.0,
                                height: 120.0,
                                child: InkWell(
                                  onTap: () {
                                    Navigator.push(
                                        context,
                                        MaterialPageRoute(
                                            builder: (context) =>
                                                const NewProfile()));
                                  },
                                  child: Card(
                                    color: Colors.blue,
                                    elevation: 2.0,
                                    shape: RoundedRectangleBorder(
                                        borderRadius: BorderRadius.circular(8.0)),
                                    child: Center(
                                      child: Padding(
                                        padding: const EdgeInsets.all(8.0),
                                        child: Column(
                                          children: const [
                                            Icon(
                                              Icons.account_box_sharp,
                                              size: 45.0,
                                            ),
                                            SizedBox(height: 10.0),
                                            Text(
                                              "View Profile",
                                              style: TextStyle(
                                                color: Colors.white,
                                                fontWeight: FontWeight.bold,
                                                fontSize: 25.0,
                                              ),
                                            ),
                                          ],
                                        ),
                                      ),
                                    ),
                                  ),
                                ),
                              ),
                              SizedBox(
                                width: 190.0,
                                height: 120.0,
                                child: InkWell(
                                  onTap: () {
                                    Navigator.push(
                                        context,
                                        MaterialPageRoute(
                                            builder: (context) => const BarGraph()));
                                  },
                                  child: Card(
                                    color: Colors.blue,
                                    elevation: 2.0,
                                    shape: RoundedRectangleBorder(
                                        borderRadius: BorderRadius.circular(8.0)),
                                    child: Center(
                                      child: Padding(
                                        padding: const EdgeInsets.all(8.0),
                                        child: Column(
                                          children: const [
                                            Icon(
                                              Icons.bar_chart,
                                              size: 45.0,
                                            ),
                                            SizedBox(height: 10.0),
                                            Text(
                                              "View Analytics",
                                              style: TextStyle(
                                                color: Colors.white,
                                                fontWeight: FontWeight.bold,
                                                fontSize: 25.0,
                                              ),
                                            ),
                                          ],
                                        ),
                                      ),
                                    ),
                                  ),
                                ),
                              ),
                            ],
                          ),
                          SizedBox(height: 2,),
                        ],
                      ),
                    ),
                  ),
                ],
              ),
            ],
          ),
        ),
      ),
    );
  }
}


