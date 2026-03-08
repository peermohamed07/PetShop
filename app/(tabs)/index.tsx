import { zodResolver } from '@hookform/resolvers/zod';
import { Image } from 'expo-image';
import * as ImagePicker from 'expo-image-picker';
import { Link } from 'expo-router';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
  ActivityIndicator,
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { FormField } from '@/components/challenge/form-field';
import { fetchRandomPetImage, submitPetDetails } from '@/services/pet-service';
import { usePetStore } from '@/store/use-pet-store';
import { PetFormValues } from '@/types/pet';
import { petFormSchema } from '@/validation/pet-form-schema';

export default function CreatePetScreen() {
  const {
    selectedImageUri,
    randomImageUri,
    setSelectedImageUri,
    setRandomImageUri,
    addPet,
    addSubmissionRecord,
  } = usePetStore();
  const [randomImageError, setRandomImageError] = useState('');
  const [submitState, setSubmitState] = useState<{
    type: 'success' | 'error';
    message: string;
  } | null>(null);
  const [isFetchingImage, setIsFetchingImage] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PetFormValues>({
    resolver: zodResolver(petFormSchema),
    defaultValues: {
      name: '',
      breed: '',
      age: '',
      price: '',
    },
  });

  const previewImage = selectedImageUri ?? randomImageUri;

  const requestPermission = async (mode: 'camera' | 'media') => {
    const result =
      mode === 'camera'
        ? await ImagePicker.requestCameraPermissionsAsync()
        : await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!result.granted) {
      Alert.alert('Permission required', 'Please grant access to continue with image upload.');
      return false;
    }

    return true;
  };

  const openPicker = async (mode: 'camera' | 'gallery') => {
    const allowed = await requestPermission(mode === 'camera' ? 'camera' : 'media');
    if (!allowed) {
      return;
    }

    const result =
      mode === 'camera'
        ? await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 0.8,
          })
        : await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 0.8,
          });

    if (!result.canceled && result.assets[0]?.uri) {
      setSelectedImageUri(result.assets[0].uri);
      setSubmitState(null);
    }
  };

  const handleRandomImage = async () => {
    setRandomImageError('');
    setIsFetchingImage(true);

    try {
      const imageUrl = await fetchRandomPetImage();
      setRandomImageUri(imageUrl);
      setSubmitState(null);
    } catch (error) {
      setRandomImageError(error instanceof Error ? error.message : 'Failed to fetch image');
    } finally {
      setIsFetchingImage(false);
    }
  };

  const onSubmit = handleSubmit(async (values) => {
    const finalImageUri = selectedImageUri ?? randomImageUri;

    if (!finalImageUri) {
      setSubmitState({
        type: 'error',
        message: 'Please upload an image from camera/gallery or fetch a random pet image first.',
      });
      return;
    }

    setIsSubmitting(true);
    setSubmitState(null);

    try {
      const result = await submitPetDetails({
        name: values.name.trim(),
        breed: values.breed.trim(),
        age: Number(values.age),
        price: Number(values.price),
      });

      addPet({
        id: `submitted-${Date.now()}`,
        name: values.name.trim(),
        breed: values.breed.trim(),
        age: Number(values.age),
        price: Number(values.price),
        imageUrl: finalImageUri,
        source: 'submitted',
        remoteId: result.id,
        createdAt: result.createdAt,
      });
      addSubmissionRecord({
        id: `${Date.now()}`,
        petName: values.name.trim(),
        breed: values.breed.trim(),
        status: 'success',
        createdAt: result.createdAt,
        message: `Submitted successfully to ReqRes with remote id ${result.id}.`,
      });
      setSubmitState({
        type: 'success',
        message: `Pet details submitted successfully. ReqRes id: ${result.id}`,
      });
      reset();
      setSelectedImageUri(null);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unable to submit pet details';
      addSubmissionRecord({
        id: `${Date.now()}`,
        petName: values.name.trim(),
        breed: values.breed.trim(),
        status: 'error',
        createdAt: new Date().toISOString(),
        message,
      });
      setSubmitState({
        type: 'error',
        message,
      });
    } finally {
      setIsSubmitting(false);
    }
  });

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
        <View style={styles.hero}>
        <Text style={styles.title}>
          Create pet details, upload an image
        </Text>
       
        <View style={styles.heroActions}>
          <Link href="/(tabs)/explore" style={styles.primaryButton}>
            <Text style={styles.primaryButtonText}>View pet listing</Text>
          </Link>
          {/* <Text style={styles.endpointText}>POST: {apiEndpoints.submitPetDetails}</Text> */}
        </View>
      </View>

      <View style={styles.panel}>
        <View style={styles.panelHeader}>
          <Text style={styles.sectionTitle}>Pet image upload</Text>
          <Text style={styles.sectionCaption}>
            Upload from gallery or camera, then preview before submit.
          </Text>
        </View>
        <View style={styles.actionRow}>
          <Pressable onPress={() => openPicker('gallery')} style={styles.actionButton}>
            <Text style={styles.actionButtonText}>Choose from gallery</Text>
          </Pressable>
          <Pressable onPress={() => openPicker('camera')} style={styles.actionButtonSecondary}>
            <Text style={styles.actionButtonSecondaryText}>Open camera</Text>
          </Pressable>
        </View>
      </View>

      <View style={styles.panel}>
        <View style={styles.panelHeader}>
          <Text style={styles.sectionTitle}>Random pet image</Text>
          <Text style={styles.sectionCaption}>
            Fetch a live image from Dog CEO and display it in the UI.
          </Text>
        </View>
        <Pressable onPress={handleRandomImage} style={styles.fetchButton} disabled={isFetchingImage}>
          {isFetchingImage ? (
            <ActivityIndicator color="#FFF8F0" />
          ) : (
            <Text style={styles.fetchButtonText}>Fetch random image</Text>
          )}
        </Pressable>
        {randomImageError ? <Text style={styles.errorText}>{randomImageError}</Text> : null}
      </View>

      <View style={styles.previewCard}>
        <Text style={styles.sectionTitle}>Image preview</Text>
        {previewImage ? (
          <Image source={previewImage} style={styles.previewImage} contentFit="cover" />
        ) : (
          <View style={styles.previewPlaceholder}>
            <Text style={styles.previewPlaceholderText}>No image selected yet</Text>
          </View>
        )}
        <Text style={styles.previewHint}>
          Uploaded image takes priority. If you do not upload one, the fetched API image will be
          used for the pet card.
        </Text>
      </View>

      <View style={styles.formCard}>
        <Text style={styles.sectionTitle}>Pet details form</Text>
        <Text style={styles.sectionCaption}>Validated with React Hook Form and Zod.</Text>

        <Controller
          control={control}
          name="name"
          render={({ field: { onChange, value } }) => (
            <FormField
              label="Pet Name"
              value={value}
              onChangeText={onChange}
              placeholder="Enter pet name"
              error={errors.name?.message}
            />
          )}
        />
        <Controller
          control={control}
          name="breed"
          render={({ field: { onChange, value } }) => (
            <FormField
              label="Breed"
              value={value}
              onChangeText={onChange}
              placeholder="Enter breed"
              error={errors.breed?.message}
            />
          )}
        />
        <Controller
          control={control}
          name="age"
          render={({ field: { onChange, value } }) => (
            <FormField
              label="Age"
              value={value}
              onChangeText={onChange}
              placeholder="Enter age"
              keyboardType="numeric"
              error={errors.age?.message}
            />
          )}
        />
        <Controller
          control={control}
          name="price"
          render={({ field: { onChange, value } }) => (
            <FormField
              label="Price"
              value={value}
              onChangeText={onChange}
              placeholder="Enter price"
              keyboardType="numeric"
              error={errors.price?.message}
            />
          )}
        />

        {submitState ? (
          <View
            style={[
              styles.banner,
              submitState.type === 'success' ? styles.successBanner : styles.errorBanner,
            ]}>
            <Text
              style={[
                styles.bannerText,
                submitState.type === 'success' ? styles.successText : styles.errorText,
              ]}>
              {submitState.message}
            </Text>
          </View>
        ) : null}

        <Pressable onPress={onSubmit} style={styles.submitButton} disabled={isSubmitting}>
          {isSubmitting ? (
            <ActivityIndicator color="#FFF8F0" />
          ) : (
            <Text style={styles.submitButtonText}>Submit pet details</Text>
          )}
        </Pressable>
      </View>

        <View style={styles.promoCard}>
          <Text style={styles.promoEyebrow}>Challenge coverage</Text>
          <Text style={styles.promoTitle}>Upload, preview, validate, POST, list, cart.</Text>
          <Text style={styles.promoText}>
            Continue to the listing tab to see submitted pets mixed with seed data and add them to
            the global cart.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F7F1E8',
  },
  screen: {
    flex: 1,
    backgroundColor: '#F7F1E8',
  },
  content: {
    padding: 20,
    gap: 20,
  },
  hero: {
    backgroundColor: '#1F1A14',
    borderRadius: 30,
    padding: 24,
    gap: 12,
  },
  kicker: {
    color: '#F2BC8D',
    fontSize: 12,
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  title: {
    color: '#FFF9F1',
    fontSize: 30,
    fontWeight: '900',
    lineHeight: 38,
  },
  subtitle: {
    color: '#E9DDCE',
    fontSize: 15,
    lineHeight: 23,
  },
  heroActions: {
    gap: 12,
    marginTop: 8,
  },
  primaryButton: {
    backgroundColor: '#D86F45',
    borderRadius: 999,
    paddingHorizontal: 18,
    paddingVertical: 14,
    alignSelf: 'flex-start',
  },
  primaryButtonText: {
    color: '#FFF9F1',
    fontSize: 14,
    fontWeight: '800',
  },
  endpointText: {
    color: '#E9DDCE',
    fontSize: 12,
    fontWeight: '600',
  },
  panel: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#EAE3D6',
    padding: 18,
    gap: 14,
  },
  panelHeader: {
    gap: 6,
  },
  sectionTitle: {
    color: '#1F1A14',
    fontSize: 22,
    fontWeight: '900',
  },
  sectionCaption: {
    color: '#5F5549',
    fontSize: 14,
    lineHeight: 21,
  },
  actionRow: {
    gap: 10,
  },
  actionButton: {
    backgroundColor: '#1F1A14',
    borderRadius: 18,
    paddingVertical: 14,
    alignItems: 'center',
  },
  actionButtonText: {
    color: '#FFF8F0',
    fontSize: 14,
    fontWeight: '800',
  },
  actionButtonSecondary: {
    borderWidth: 1,
    borderColor: '#D8CCBD',
    borderRadius: 18,
    paddingVertical: 14,
    alignItems: 'center',
  },
  actionButtonSecondaryText: {
    color: '#1F1A14',
    fontSize: 14,
    fontWeight: '700',
  },
  fetchButton: {
    backgroundColor: '#D86F45',
    borderRadius: 18,
    paddingVertical: 14,
    alignItems: 'center',
    minHeight: 52,
    justifyContent: 'center',
  },
  fetchButtonText: {
    color: '#FFF8F0',
    fontSize: 14,
    fontWeight: '800',
  },
  previewCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#EAE3D6',
    padding: 18,
    gap: 12,
  },
  previewImage: {
    width: '100%',
    height: 220,
    borderRadius: 18,
    backgroundColor: '#ECE7DE',
  },
  previewPlaceholder: {
    height: 220,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#E4DED3',
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FBF7F2',
  },
  previewPlaceholderText: {
    color: '#867969',
    fontSize: 15,
    fontWeight: '600',
  },
  previewHint: {
    color: '#6B6256',
    fontSize: 13,
    lineHeight: 20,
  },
  formCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#EAE3D6',
    padding: 18,
    gap: 14,
  },
  banner: {
    borderRadius: 16,
    padding: 14,
  },
  successBanner: {
    backgroundColor: '#E0F2E4',
  },
  errorBanner: {
    backgroundColor: '#FBE4E4',
  },
  bannerText: {
    fontSize: 13,
    lineHeight: 20,
    fontWeight: '700',
  },
  successText: {
    color: '#235B31',
  },
  errorText: {
    color: '#A03E3E',
  },
  submitButton: {
    backgroundColor: '#1F1A14',
    borderRadius: 18,
    minHeight: 52,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 6,
  },
  submitButtonText: {
    color: '#FFF8F0',
    fontSize: 15,
    fontWeight: '800',
  },
  promoCard: {
    backgroundColor: '#D8EBD2',
    borderRadius: 28,
    padding: 22,
    gap: 8,
    marginBottom: 20,
  },
  promoEyebrow: {
    color: '#42633C',
    fontSize: 12,
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: 0.6,
  },
  promoTitle: {
    color: '#173113',
    fontSize: 22,
    fontWeight: '900',
  },
  promoText: {
    color: '#355130',
    fontSize: 14,
    lineHeight: 21,
  },
});
