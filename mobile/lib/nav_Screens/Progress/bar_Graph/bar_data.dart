import 'individual_Bar.dart';

class BarData{
  final double scienceAmount;
  final double mathsAmount;
  final double englishAmount;
  final double sinhalaAmount;
  final double buddhismAmount;
  final double bascket1Amount;
  final double bascket2Amount;
  final double bascket3Amount;

  BarData({
    required this.scienceAmount,
    required this.mathsAmount,
    required this.englishAmount,
    required this.sinhalaAmount,
    required this.buddhismAmount,
    required this.bascket1Amount,
    required this.bascket2Amount,
    required this.bascket3Amount,
});

  List<IndividualBar> barData = [];

  void initializeBarData() {
    barData = [
      IndividualBar(x: 0, y: scienceAmount),
      IndividualBar(x: 1, y: mathsAmount),
      IndividualBar(x: 2, y: englishAmount),
      IndividualBar(x: 3, y: sinhalaAmount),
      IndividualBar(x: 4, y: buddhismAmount),
      IndividualBar(x: 5, y: bascket1Amount),
      IndividualBar(x: 6, y: bascket2Amount),
      IndividualBar(x: 7, y: bascket3Amount),
    ];
  }
}