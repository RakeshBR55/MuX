<TextInput
                        value={secondaryCardNumber}
                        onChangeText={setSecondaryCardNumber}
                        placeholder="Secondary card number"
                        keyboardType="numeric"
                        style={styles.textInput}
                    />
                    <TextInput
                        value={secondaryCardExpiry}
                        onChangeText={setSecondaryCardExpiry}
                        placeholder="Secondary card expiry"
                        keyboardType="numeric"
                        style={styles.textInput}
                    />
                    <TextInput
                        value={secondaryCardCVV}
                        onChangeText={setSecondaryCardCVV}
                        placeholder="Secondary card CVV"
                        keyboardType="numeric"
                        style={styles.textInput}
                    />
                    <TouchableOpacity onPress={handleSecondaryCardSubmit} style={styles.submitButton}>
                        <Text style={styles.submitButtonText}>Submit Secondary Card</Text>
                    </TouchableOpacity>