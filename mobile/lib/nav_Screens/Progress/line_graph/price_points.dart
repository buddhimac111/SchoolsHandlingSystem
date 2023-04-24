import 'package:collection/collection.dart';

class PricePoint {
  final int x;
  final double y;

  PricePoint({
    required this.x,
    required this.y
  });
}

List<PricePoint> get pricePoints {
  final data1 = <double>[20, 40, 60, 80, 11, 30, 29, 89, 98];
  return [
    ...data1.mapIndexed(
          (index, element) => PricePoint(x: index, y: element),
    ),

  ];
}

class PricePoint1 {
  final int x;
  final double y;

  PricePoint1({
    required this.x,
    required this.y
  });
}

List<PricePoint1> get pricePoints1 {
  final data2 = <double>[99, 39, 59, 79, 99, 12, 80, 30, 41];
  return [
    ...data2.mapIndexed(
          (index, element) => PricePoint1(x: index, y: element),
    ),

  ];
}

class PricePoint2 {
  final int x;
  final double y;

  PricePoint2({
    required this.x,
    required this.y
  });
}

List<PricePoint2> get pricePoints2 {
  final data3 = <double>[51, 63, 71, 83, 81, 93, 91, 93, 100];
  return [
    ...data3.mapIndexed(
          (index, element) => PricePoint2(x: index, y: element),
    ),

  ];
}