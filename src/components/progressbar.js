import React from 'react';
import {
    Modal,
    View,
    StyleSheet,
    Text,
    ActivityIndicator
} from 'react-native';

const ProgressDialog = ({ visible }) => (
    <Modal
        visible={visible}
    >
        <View style={styles.container}>
            <ActivityIndicator size='large' />
        </View>
    </Modal>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "#F2F2F2"
    }
})

export default ProgressDialog;