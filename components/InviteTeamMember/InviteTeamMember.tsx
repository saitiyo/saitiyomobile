import React, { forwardRef, useMemo, useState } from 'react';

import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';


import { useMutation } from '@apollo/client/react';

import Icon from '@react-native-vector-icons/ionicons';

import colors from '../../constants/colors';

import { INVITE_TEAM_MEMBER } from '../../graphql/teams';

interface Props {
  siteId: string;

  invitedByUserId: string;

  onSuccess?: () => void;
  onCancel?: () => void;
}

const InviteTeamMember = ({siteId,invitedByUserId,onSuccess,onCancel}:Props) => {
 

    const [phone, setPhone] = useState('');

    const [inviteMember, { loading }] = useMutation(INVITE_TEAM_MEMBER);

    const invite = () => {
      if (phone.trim().length < 10) {
        return;
      }

      inviteMember({
        variables: {
          siteId,

          invitedByUserId,

          invitedMobileNumber: phone,
        },

        onCompleted: data => {
          setPhone('');

          onSuccess?.();
        },
      });
    };

    return (
        <View style={styles.container}>
          <Text style={styles.title}>Invite Team Member</Text>

          <Text style={styles.label}>Phone Number</Text>

          <View style={styles.input}>
            <Icon name="call-outline" size={20} color={colors.gray400} />

            <TextInput
              placeholder="+2567XXXXXXXX"
              placeholderTextColor={colors.gray300}
              style={styles.textInput}
              keyboardType="phone-pad"
              value={phone}
              onChangeText={setPhone}
            />
          </View>

          <View style={styles.buttons}>
            <TouchableOpacity
              style={styles.cancel}
              onPress={() => {
                onCancel?.()
              }}
            >
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.invite}
              disabled={loading}
              onPress={invite}
            >
              <Text style={styles.inviteText}>
                {loading ? 'Inviting...' : 'Invite'}
              </Text>
            </TouchableOpacity>
          </View>
      </View>
    );
  }

export default InviteTeamMember;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },

  title: {
    fontSize: 22,

    fontWeight: '700',

    color: colors.textDark,

    marginBottom: 20,
  },

  label: {
    marginBottom: 8,

    color: colors.textGray,

    fontWeight: '500',
  },

  input: {
    height: 54,

    borderWidth: 1,

    borderColor: colors.gray100,

    borderRadius: 12,

    paddingHorizontal: 16,

    flexDirection: 'row',

    alignItems: 'center',
  },

  textInput: {
    flex: 1,

    marginLeft: 12,

    color: colors.textDark,
  },

  buttons: {
    flexDirection: 'row',

    marginTop: 30,
  },

  cancel: {
    flex: 1,

    height: 50,

    borderRadius: 12,

    backgroundColor: colors.gray100,

    justifyContent: 'center',

    alignItems: 'center',

    marginRight: 10,
  },

  invite: {
    flex: 1,

    height: 50,

    borderRadius: 12,

    backgroundColor: colors.primary,

    justifyContent: 'center',

    alignItems: 'center',
  },

  cancelText: {
    fontWeight: '600',

    color: colors.textDark,
  },

  inviteText: {
    fontWeight: '700',

    color: colors.white,
  },
});
