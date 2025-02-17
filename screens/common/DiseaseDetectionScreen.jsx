import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Import the icon set you want to use
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons'; // For additional icons

// Get screen dimensions
const { width, height } = Dimensions.get('window');

const DiseaseDetectionScreen = ({
    disease = {
        name: 'Psoriasis',
        tags: ['Auto Immune', 'Carcinogenic'],
        description: 'Psoriasis Is A Chronic (Long-Lasting) Disease In Which The Immune System Becomes Overactive, Causing Skin Cells To Multiply Too Quickly. Patches Of Skin Become Scaly And Inflamed, Most Often On The Scalp, Elbows, Or Knees, But Other Parts Of The Body Can Be Affected As Well.Psoriasis Is A Chronic (Long-Lasting) Disease In Which The Immune System Becomes Overactive, Causing Skin Cells To Multiply Too Quickly. Patches Of Skin Become Scaly And Inflamed, Most Often On The Scalp, Elbows, Or Knees, But Other Parts Of The Body Can Be Affected As Well',
    }
}) => {
    return (
        <View style={styles.container}>
            {/* Header */}
            <Text style={styles.title}>TwatchAI</Text>

            {/* Disease Name */}
            <Text style={styles.diseaseTitle}>{disease.name} Detected</Text>

            {/* Tags */}
            <View style={styles.tagContainer}>
                {disease.tags.map((tag, index) => (
                    <View
                        key={index}
                        style={[
                            styles.tag,
                            { backgroundColor: index === 0 ? '#FFA500' : '#DA70D6' }
                        ]}
                    >
                        <Text style={styles.tagText}>{tag}</Text>
                    </View>
                ))}
            </View>

            {/* Info Card */}
            <View style={styles.infoCard}>
                <Icon name="info-circle" size={24} color="#000" style={styles.infoIcon} />
                <ScrollView style={styles.scrollView}>
                    <Text style={styles.infoText}>{disease.description}</Text>
                </ScrollView>
            </View>

            {/* Chat Button Text */}
            <Text style={styles.chatText}>Continue With AI Chatbot To Know More</Text>

            {/* Chat Icon */}
            <View style={styles.chatIconContainer}>
                <MaterialIcon name="robot" size={24} color="#fff" />
            </View>

            {/* Back Button */}
            <TouchableOpacity style={styles.backButton}>
                <Text style={styles.backButtonText}>Go Back</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F0F8FF',
        padding: width * 0.05, // 5% of screen width
        alignItems: 'center',
    },
    title: {
        fontSize: width * 0.06, // 6% of screen width
        color: '#000',
        fontWeight: '800',
        marginRight: width * 0.5, // 50% of screen width
        marginTop: height * 0.05, // 5% of screen height
        marginBottom: height * 0.05, // 5% of screen height
    },
    diseaseTitle: {
        fontSize: width * 0.08, // 8% of screen width
        fontWeight: '900',
        color: '#1E2F97',
        marginBottom: height * 0.03, // 3% of screen height
        textAlign: 'center',
    },
    tagContainer: {
        flexDirection: 'row',
        gap: width * 0.03, // 3% of screen width
        marginBottom: height * 0.03, // 3% of screen height
    },
    tag: {
        paddingHorizontal: width * 0.05, // 5% of screen width
        paddingVertical: height * 0.01, // 1% of screen height
        borderRadius: 20,
    },
    tagText: {
        color: '#fff',
        fontSize: width * 0.04, // 4% of screen width
        fontWeight: '500',
    },
    infoCard: {
        backgroundColor: '#fff',
        borderRadius: 15,
        padding: width * 0.04, // 4% of screen width
        width: width * 0.9, // 90% of screen width
        marginBottom: height * 0.03, // 3% of screen height
        height: height * 0.4, // 40% of screen height
    },
    infoIcon: {
        marginBottom: height * 0.01, // 1% of screen height
    },
    scrollView: {
        flex: 1,
    },
    infoText: {
        color: '#000',
        fontSize: width * 0.04, // 4% of screen width
        lineHeight: height * 0.03, // 3% of screen height
        textAlign: 'center',
    },
    chatText: {
        fontSize: width * 0.04, // 4% of screen width
        fontWeight: '600',
        color: '#1E2F97',
        marginBottom: height * 0.02, // 2% of screen height
    },
    chatIconContainer: {
        backgroundColor: '#1E2F97',
        padding: width * 0.03, // 3% of screen width
        borderRadius: 30,
        marginBottom: height * 0.03, // 3% of screen height
    },
    backButton: {
        backgroundColor: '#1E2F97',
        paddingVertical: height * 0.02, // 2% of screen height
        paddingHorizontal: width * 0.1, // 10% of screen width
        borderRadius: 10,
        width: width * 0.9, // 90% of screen width
    },
    backButtonText: {
        color: '#fff',
        fontSize: width * 0.04, // 4% of screen width
        fontWeight: '500',
        textAlign: 'center',
    },
});

export default DiseaseDetectionScreen;