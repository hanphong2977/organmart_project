import React, { useState } from 'react';
import {
    Modal,
    View,
    Text,
    TouchableOpacity,
    Pressable,
} from 'react-native';
import tw from 'twrnc';
import { Product } from '@/types';

interface AddToCartModalProps {
    visible: boolean;
    product: Product | null;
    onClose: () => void;
    onConfirm: (params: {
        productId: number;
        quantity: number;
    }) => void;
}


const AddToCartModal: React.FC<AddToCartModalProps> = ({
                                                           visible,
                                                           product,
                                                           onClose,
                                                           onConfirm,
                                                       }) => {
    const [quantity, setQuantity] = useState(1);

    const resetState = () => {
        setQuantity(1);
    };

    const handleClose = () => {
        resetState();
        onClose();
    };

    const handleConfirm = () => {
        if (product) {
            onConfirm({
                productId: product.id,
                quantity,
            });
        }
        resetState();
        onClose();
    };

    if (!product) return null;

    return (
        <Modal
            visible={visible}
            transparent
            animationType="slide"
            onRequestClose={handleClose}
        >
            <View style={tw`flex-1 justify-end bg-black/50`}>
                <View style={tw`bg-white p-5 rounded-t-3xl`}>
                    <Text style={tw`text-lg font-bold text-green-800 mb-1`}>
                        {product.name}
                    </Text>
                    <Text style={tw`text-base text-green-700 mb-4`}>
                        {product.price.toLocaleString()} đ
                    </Text>

                    {/* Quantity */}
                    <View style={tw`flex-row items-center justify-between mb-6`}>
                        <Text style={tw`text-base font-semibold text-green-800`}>
                            Số lượng
                        </Text>
                        <View style={tw`flex-row items-center bg-green-700 rounded-full px-4 py-2`}>
                            <TouchableOpacity onPress={() => setQuantity(q => Math.max(1, q - 1))}>
                                <Text style={tw`text-white text-xl`}>–</Text>
                            </TouchableOpacity>
                            <Text style={tw`text-white mx-4 text-base`}>{quantity}</Text>
                            <TouchableOpacity onPress={() => setQuantity(q => q + 1)}>
                                <Text style={tw`text-white text-xl`}>+</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* Buttons */}
                    <View style={tw`flex-row justify-end`}>
                        <Pressable onPress={handleClose} style={tw`mr-4`}>
                            <Text style={tw`text-gray-500 px-5 py-2 rounded-xl`}>Hủy</Text>
                        </Pressable>
                        <TouchableOpacity onPress={handleConfirm} style={tw`bg-green-700 px-5 py-2 rounded-xl`}>
                            <Text style={tw`text-white font-semibold`}>Thêm vào giỏ</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

export default AddToCartModal;
