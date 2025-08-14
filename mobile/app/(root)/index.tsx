import { SignedIn, SignedOut, useUser } from '@clerk/clerk-expo';
import { Link, useRouter } from 'expo-router';
import { Image, Text, TouchableOpacity, View } from 'react-native';

import { BalanceCard, PageLoader, SignOutButton } from '@/components';
import { useTransactions } from '@/hooks/use-transactions';
import { useEffect } from 'react';
import { styles } from '@/assets/styles/home.styles';
import { Ionicons } from '@expo/vector-icons';

export default function Page() {
  const router = useRouter();
  const { user } = useUser();
  const { transactions, summary, isLoading, loadData, deleteTransaction } =
    useTransactions(user?.id!);

  useEffect(() => {
    loadData();
  }, [loadData]);

  if (isLoading) return <PageLoader />;

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Image
              source={require('../../assets/images/logo.png')}
              style={styles.headerLogo}
              resizeMode="contain"
            />
            <View style={styles.welcomeContainer}>
              <Text style={styles.welcomeText}>Welcome,</Text>
              <Text style={styles.usernameText}>
                {user?.emailAddresses[0]?.emailAddress.split('@')[0]}
              </Text>
            </View>
          </View>
          <View style={styles.headerRight}>
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => router.push('/create')}
            >
              <Ionicons name="add" size={20} color="#FFF" />
              <Text style={styles.addButtonText}>Add</Text>
            </TouchableOpacity>
            <SignOutButton />
          </View>
        </View>
        <BalanceCard summary={summary} />
      </View>
    </View>
  );
}
