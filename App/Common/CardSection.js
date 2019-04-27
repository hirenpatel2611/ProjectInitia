import React from 'react';
import { View } from 'react-native';

const CardSection = (props) => {
    return (
        <View style={[styles.containerStyle, props.style]} >
            {props.children}
        </View>
    );
};

const styles = {
    containerStyle: {
        borderBottomWidth: 1,
        borderTopWidth:1,
        padding: 5,
        backgroundColor: 'transparent',
        justifyContent: 'flex-start',
        flexDirection: 'row',
        borderColor: '#ddd',
        position: 'relative',
        top:15
    }
};

export { CardSection };
