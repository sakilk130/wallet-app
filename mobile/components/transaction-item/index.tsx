import { styles } from '@/assets/styles/home.styles';
import { CATEGORY_ICONS } from '@/constants/category';
import { COLORS } from '@/constants/colors';
import { formatDate } from '@/lib/utils';
import { Ionicons } from '@expo/vector-icons';
import { Text, TouchableOpacity, View } from 'react-native';

interface TransactionItemProps {
  item: any;
  onDelete: (id: string) => void;
}

const TransactionItem = ({ item, onDelete }: TransactionItemProps) => {
  const isIncome = parseFloat(item.amount) > 0;
  const iconName =
    (CATEGORY_ICONS[
      (item?.category as keyof typeof CATEGORY_ICONS) ?? 'Other'
    ] as React.ComponentProps<typeof Ionicons>['name']) || 'pricetag-outline';

  return (
    <View style={styles.transactionCard} key={item.id}>
      <TouchableOpacity style={styles.transactionContent}>
        <View style={styles.categoryIconContainer}>
          <Ionicons
            name={iconName}
            size={22}
            color={isIncome ? COLORS.income : COLORS.expense}
          />
        </View>
        <View style={styles.transactionLeft}>
          <Text style={styles.transactionTitle}>{item.title}</Text>
          <Text style={styles.transactionCategory}>{item.category}</Text>
        </View>
        <View style={styles.transactionRight}>
          <Text
            style={[
              styles.transactionAmount,
              { color: isIncome ? COLORS.income : COLORS.expense },
            ]}
          >
            {isIncome ? '+' : '-'}$
            {Math.abs(parseFloat(item.amount)).toFixed(2)}
          </Text>
          <Text style={styles.transactionDate}>
            {formatDate(item.created_at)}
          </Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => onDelete(item.id)}
      >
        <Ionicons name="trash-outline" size={20} color={COLORS.expense} />
      </TouchableOpacity>
    </View>
  );
};

export { TransactionItem };
