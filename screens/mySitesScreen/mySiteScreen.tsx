import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { gql} from '@apollo/client';
import { useQuery } from '@apollo/client/react';

import DashboardHeader from '../../components/DashboardHeader/DashboardHeader';
import ProjectCard from '../../components/ProjectCard/ProjectCard';
import CustomButton from '../../components/CustomBotton/CustomButton';
import colors from '../../constants/Colors';


const GET_PROJECTS = gql`
  query GetProjects {
    projects {
      id
      name
      logoUrl
      status
      daysLeft
      progress
      notificationCount
    }
  }
`;

type Project = {
  id: string;
  name: string;
  logoUrl?: string;
  status?: string;
  daysLeft?: number;
  progress?: number;
  notificationCount?: number;
};

type GetProjectsData = {
  projects: Project[];
};

const MySitesScreen = () => {

  const { data, loading, error } = useQuery<GetProjectsData>(GET_PROJECTS);

  if (loading) return <ActivityIndicator style={{flex: 1}} size="large" />;

  const projects = data?.projects || [];

  return (
    <View style={styles.container}>
      <DashboardHeader />
      
      {projects.length === 0 ? (
        // --- EMPTY STATE VIEW ---
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyTitle}>No Sites</Text>
          <Text style={styles.emptySub}>You have no sites at the moment</Text>
          <View style={{ width: '100%', marginTop: 20 }}>
            <CustomButton title="Add New" onPress={() => {}} />
          </View>
        </View>
      ) : (
        // --- LIST VIEW ---
        <View style={{ flex: 1 }}>
          <View style={styles.listHeader}>
            <Text style={styles.title}>All Site</Text>
            <TouchableOpacity>
              <Text style={styles.addNewText}>Add New</Text>
            </TouchableOpacity>
          </View>
          
          <FlatList
            data={projects}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <ProjectCard project={item} />}
            contentContainerStyle={{ paddingBottom: 40 }}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.white },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  emptyTitle: { fontSize: 22, fontWeight: 'bold', color: colors.black },
  emptySub: { fontSize: 14, color: '#888', textAlign: 'center', marginTop: 8 },
  listHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginVertical: 20,
  },
  title: { fontSize: 22, fontWeight: 'bold', color: colors.black },
  addNewText: { fontSize: 14, color: '#333', fontWeight: '500' },
});

export default MySitesScreen;