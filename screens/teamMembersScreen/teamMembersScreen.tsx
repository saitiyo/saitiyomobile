import React, { useMemo, useRef, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from '@react-native-vector-icons/ionicons';

import colors from '../../constants/colors';
import TeamMemberListItem from '../../components/TeamMemberListItem/TeamMemberListItem';

import {
  GET_SITE_TEAM_MEMBERS,
  GET_SUPPORT_TEAM_MEMBERS,
} from '../../graphql/teams';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { useQuery } from '@apollo/client/react';
import ErrorState from '../../components/ErrorState/ErrorState';
import CustomAppBar from '../../components/CustomAppBar/CustomAppBar';
import InviteTeamMember from '../../components/InviteTeamMember/InviteTeamMember';
import CustomBottomSheet from '../../components/CustomBottomSheet/CustomBottomSheet';
import AddSupportTeamMember from '../../components/AddSupportTeamMember/AddSupportTeamMember';
import Spacer from '../../components/Spacer/Spacer';

const TeamMembersScreen = ({ navigation }: any) => {

  const siteId = useSelector(
    (state: RootState) => state.siteSlice.selectedSite?._id,
  );

  const [tab, setTab] = useState<'team' | 'support'>('team');
  const [search, setSearch] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const [showBottomSheet,setShowBottomSheet] = useState<boolean>(false)

  const {
    data: teamData,
    loading: teamLoading,
    refetch: refetchTeam,
    error: teamError,
  }: any = useQuery(GET_SITE_TEAM_MEMBERS, {
    variables: {
      siteId,
    },
    skip: tab !== 'team',
  });

  const {
    data: supportData,

    loading: supportLoading,

    refetch: refetchSupport,

    error: supportError,
  }: any = useQuery(GET_SUPPORT_TEAM_MEMBERS, {
    variables: {
      siteId,
    },

    skip: tab !== 'support',
  });

  const members = useMemo(() => {
    if (tab === 'team') {
      return (teamData?.getSiteTeamMembers ?? []).map((member: any) => ({
        id: member.id,

        name: `${member.user.firstName} ${member.user.lastName}`,

        role: member.role,

        status: member.status,

        subtitle: member.joinedAt
          ? `Joined ${new Date(member.joinedAt).toLocaleDateString()}`
          : '',
      }));
    }

    return (supportData?.getSupportTeamMembers ?? []).map((member: any) => ({
      id: member._id,

      name: `${member.firstName} ${member.lastName}`,

      role: member.mobileNumber,

      status: member.status,

      subtitle: member.email,
    }));
  }, [tab, teamData, supportData]);

  const onRefresh = () => {
    if (tab === 'team') {
      refetchTeam();
    } else {
      refetchSupport();
    }
  };

  const filteredMembers = members.filter((member: any) =>
    member.name

      .toLowerCase()

      .includes(search.toLowerCase()),
  );

  if (teamLoading || supportLoading) {
    return (
      <View
        style={{
          width: '100%',
          height: '100%',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  if (teamError) {
    return (
      <ErrorState
        title="Unable to load team members"
        description={teamError.message}
        onRetry={onRefresh}
      />
    );
  }

  if (supportError) {
    return (
      <ErrorState
        title="Unable to load support team members"
        description={supportError.message}
        onRetry={onRefresh}
      />
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}

      <CustomAppBar
       title='Team Members'
       description='Manage everyone working on this site'
       canMoveBack={true}
      />

      <Spacer height={40}/>

      {/* Tabs */}

       

      <View style={styles.tabs}>
        <TouchableOpacity
          style={[styles.tab, tab === 'team' && styles.activeTab]}
          onPress={() => setTab('team')}
        >
          <Text
            style={[styles.tabText, tab === 'team' && styles.activeTabText]}
          >
            Team
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tab, tab === 'support' && styles.activeTab]}
          onPress={() => setTab('support')}
        >
          <Text
            style={[styles.tabText, tab === 'support' && styles.activeTabText]}
          >
            Support
          </Text>
        </TouchableOpacity>
      </View>

      {/* Search */}

      <View style={styles.search}>
        <Icon name="search-outline" color={colors.gray400} size={20} />

        <TextInput
          placeholder="Search member..."
          placeholderTextColor={colors.gray300}
          style={styles.input}
          value={search}
          onChangeText={setSearch}
        />
        
      </View>

      {/* Members */}

      <FlatList
        data={filteredMembers}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TeamMemberListItem
            name={item.name}
            role={item.role}
            status={item.status}
            subtitle={item.subtitle}
            onPress={() =>
              navigation.navigate(
                'MemberDetails',

                {
                  memberId: item.id,
                },
              )
            }
          />
        )}
        refreshControl={
          <RefreshControl
            refreshing={teamLoading || supportLoading}
            onRefresh={onRefresh}
          />
        }
      />

      {/* FAB */}

     { tab === "support" && <TouchableOpacity
        onPress={() => setShowBottomSheet(true)}
        style={styles.fab}
        activeOpacity={0.8}
      >
        <Icon name="add" color={colors.white} size={28} />
      </TouchableOpacity>
      }
      { tab === "team" && <TouchableOpacity 
         onPress={() => setShowBottomSheet(true)}
         style={styles.inviteBtn}>
          <Icon name="person-add-outline" color={colors.white} size={18} />

          <Text style={styles.inviteText}>Invite</Text>
      </TouchableOpacity>}

      {/* SHEET */}
     <CustomBottomSheet
       show={showBottomSheet}
       close={()=> setShowBottomSheet(!showBottomSheet)}
       snapPoints={['55%', '75%', '100%']}
       enablePanDownToClose={false}
     >
       { tab=== "team" && <InviteTeamMember
        siteId={siteId as any}
        invitedByUserId={siteId as string}
        onSuccess={() => {
          setShowBottomSheet(!showBottomSheet)
          refetchTeam();
        }}
        onCancel={()=> setShowBottomSheet(!showBottomSheet)}
      />}

      {tab === "support" && 
      <AddSupportTeamMember
       siteId={siteId as any}
        onSuccess={() => {
          setShowBottomSheet(!showBottomSheet)
          refetchTeam();

        }}
       onCancel={()=> setShowBottomSheet(!showBottomSheet)}
      />}
     </CustomBottomSheet>
    </SafeAreaView>
  );
};

export default TeamMembersScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.gray50,
  },

  header: {
    paddingHorizontal: 16,
    paddingTop: 18,
    paddingBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  title: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.textDark,
  },

  subtitle: {
    marginTop: 4,
    fontSize: 14,
    color: colors.textGray,
  },

  inviteBtn: {
    position: 'absolute',
    right: 24,
    bottom: 30,
    backgroundColor: colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    height: 42,
    borderRadius: 12,
  },

  inviteText: {
    color: colors.white,
    marginLeft: 6,
    fontWeight: '600',
  },

  tabs: {
    marginHorizontal: 16,
    flexDirection: 'row',
    backgroundColor: colors.gray100,
    borderRadius: 12,
    padding: 4,
    marginBottom: 16,
  },

  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 12,
    borderRadius: 10,
  },

  activeTab: {
    backgroundColor: colors.white,
  },

  tabText: {
    color: colors.textGray,
    fontWeight: '600',
  },

  activeTabText: {
    color: colors.primary,
  },

  search: {
    marginHorizontal: 16,
    marginBottom: 16,
    height: 52,
    backgroundColor: colors.white,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.gray100,
    paddingHorizontal: 14,
    flexDirection: 'row',
    alignItems: 'center',
  },

  input: {
    flex: 1,
    marginLeft: 10,
    color: colors.textDark,
    fontSize: 15,
  },

  list: {
    paddingHorizontal: 16,
    paddingBottom: 120,
    gap: 12,
  },

  fab: {
    position: 'absolute',
    right: 24,
    bottom: 30,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 6,
  },
});
