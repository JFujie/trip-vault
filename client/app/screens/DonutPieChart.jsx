import { useEffect, useState, useCallback, useRef } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Svg, { G, Path, Text as SvgText } from 'react-native-svg';
import { useFocusEffect } from '@react-navigation/native';
import { Octicons } from '@expo/vector-icons';
import { pie, arc } from 'd3-shape';

import { useTripsContext } from '../contexts/tripsContext';
import { useCurrencyContext } from '../contexts/currencyContext';

const DonutPieChart = ({ width = 280, height = 280 }) => {
  const {
    pinnedTrip,
    calculateTotalSpent,
    calculateTripDuration,
    calculateDailyAverage,
  } = useTripsContext();
  const { getCurrencySymbol } = useCurrencyContext();

  const [totalPerCategory, setTotalPerCategory] = useState({});
  const scrollViewRef = useRef(null);

  useEffect(() => {
    if (pinnedTrip && pinnedTrip.expenses) {
      setTotalPerCategory(calculateTotalSpentPerCategory(pinnedTrip.expenses));
    }
  }, [pinnedTrip]);

  useFocusEffect(
    useCallback(() => {
      if (pinnedTrip && pinnedTrip.expenses) {
        setTotalPerCategory(
          calculateTotalSpentPerCategory(pinnedTrip.expenses),
        );
      }
      return () => scrollViewRef.current?.scrollTo({ y: 0, animated: true });
    }, [pinnedTrip]),
  );

  const categories = [
    { id: 1, name: 'Accommodation', color: '#d9ab7a' },
    { id: 2, name: 'Activities', color: '#e17559' },
    { id: 3, name: 'Groceries', color: '#771200' },
    { id: 4, name: 'Restaurants', color: '#fda541' },
    { id: 5, name: 'Services', color: '#f24f13' },
    { id: 6, name: 'Shopping', color: '#cb1c2d' },
    { id: 7, name: 'Taxes & Fees', color: '#04d9b2' },
    { id: 8, name: 'Transportation', color: '#00b0a3' },
    { id: 9, name: 'Others', color: '#0f333f' },
  ];

  const calculateTotalSpentPerCategory = expenses => {
    const totalSpentPerCategory = {};

    expenses.forEach(expense => {
      const spent = expense.convertedAmount || expense.value;
      if (!totalSpentPerCategory[expense.categoryName]) {
        totalSpentPerCategory[expense.categoryName] = 0;
      }
      totalSpentPerCategory[expense.categoryName] += spent;
    });

    return totalSpentPerCategory;
  };

  const data = categories
    .map(category => ({
      ...category,
      value: totalPerCategory[category.name] || 0,
    }))
    .filter(category => category.value > 0);

  const radius = Math.min(width, height) / 2;
  const pieChart = pie()
    .value(d => d.value)
    .sort(
      (a, b) =>
        categories.findIndex(cat => cat.name === a.label) -
        categories.findIndex(cat => cat.name === b.label),
    )(data);
  const createArc = arc()
    .innerRadius(radius * 0.45)
    .outerRadius(radius);

  const totalSpent = calculateTotalSpent(pinnedTrip);
  const tripDuration = calculateTripDuration(pinnedTrip);
  const dailyAverage = calculateDailyAverage(totalSpent, tripDuration);
  const tripCurrencySymbol = pinnedTrip
    ? getCurrencySymbol(pinnedTrip.currency)
    : '';

  const handleDownload = () => {
    // Here we will handle the download button
    // We can use libraries like react-native-fs or
    // react-native-fetch-blob to handle file downloads
  };

  return (
    <ScrollView style={styles.container} ref={scrollViewRef}>
      <View style={styles.containerDownloadButton}>
        <TouchableOpacity
          style={styles.downloadButton}
          onPress={handleDownload}
        >
          <Octicons name="download" size={30} color="black" />
        </TouchableOpacity>
      </View>

      <Text className="text-3xl ml-4 mt-[10px] mb-2 text-[#00b0a3] font-bold items-start">
        Statistics
      </Text>

      <View style={styles.containerDailyAverage}>
        <Text className="text-lg mb-2 ml-4 font-semibold text-[#00b0a3]">
          Daily Average:{' '}
          <Text className="text-black font-medium">
            {dailyAverage} {tripCurrencySymbol}
          </Text>
        </Text>
        <Text className="text-lg  ml-4 font-semibold text-[#00b0a3]">
          Chart Metrics:{' '}
          <Text className="text-black font-medium">Expenses by Category</Text>
        </Text>
      </View>

      <View style={styles.containerChart}>
        <Svg width={width} height={height}>
          <G x={width / 2} y={height / 2}>
            {pieChart.map((slice, index) => {
              const [centroidX, centroidY] = createArc.centroid(slice);
              return (
                <G key={index}>
                  <Path d={createArc(slice)} fill={slice.data.color} />
                  <SvgText
                    x={centroidX}
                    y={centroidY}
                    fill="white"
                    textAnchor="middle"
                    alignmentBaseline="middle"
                    fontSize="16"
                    stroke="#000"
                    strokeWidth={0.1}
                    fontWeight="bold"
                  >
                    {`${((slice.data.value / data.reduce((acc, cur) => acc + cur.value, 0)) * 100).toFixed(1)}%`}
                  </SvgText>
                </G>
              );
            })}
          </G>
        </Svg>
      </View>

      <View style={styles.categories}>
        {data.map(item => (
          <View style={styles.categoryItem} key={item.id}>
            <View
              style={[styles.colorIndicator, { backgroundColor: item.color }]}
            ></View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                flex: 1,
              }}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={styles.categoryName}>{item.name}</Text>
              </View>
              <Text style={styles.valueCategory}>
                {item.value ? item.value.toFixed(2) : 0} {tripCurrencySymbol}
              </Text>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerDownloadButton: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  downloadButton: {
    marginTop: 61,
    marginEnd: 20,
    fontWeight: 'bold',
  },
  containerDailyAverage: {
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  containerChart: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 20,
    marginTop: 15,
  },
  categories: {
    marginTop: 50,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginLeft: 16,
  },
  categoryItem: {
    flexDirection: 'row',
    marginBottom: 8,
    backgroundColor: 'lightgray',
    borderRadius: 8,
    padding: 10,
    width: 380,
  },
  colorIndicator: {
    marginTop: 6,
    marginRight: 8,
    width: 24,
    height: 24,
    borderRadius: 3,
  },
  categoryName: {
    color: 'black',
    fontSize: 18,
    fontWeight: '400',
    paddingTop: 5,
    paddingBottom: 5,
  },
  valueCategory: {
    color: 'black',
    fontSize: 18,
    fontWeight: '400',
  },
});

export default DonutPieChart;
