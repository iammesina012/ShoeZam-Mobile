import { COLORS } from "@/theme/colors";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import {
  Animated,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

// describes one group of filter choices.
export type CatalogFilterSection = {
  id: string;
  title: string;
  options: string[];
  selectedValues: string[];
  isSize?: boolean;
};

// gives each sort choice a label and a value used by the results screen.
export type CatalogSortOption = {
  label: string;
  value: string;
};

type CatalogControlsProps = {
  filterSections: CatalogFilterSection[];
  getResultCount: (filters: Record<string, string[]>) => number;
  onApplyFilters: (filters: Record<string, string[]>) => void;
  sortOptions: CatalogSortOption[];
  selectedSort: string;
  onSortChange: (value: string) => void;
};

export default function CatalogControls({
  filterSections,
  getResultCount,
  onApplyFilters,
  sortOptions,
  selectedSort,
  onSortChange,
}: CatalogControlsProps) {
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [isSortVisible, setIsSortVisible] = useState(false);
  // keep sheet choices separate until the shopper applies them.
  const [draftFilters, setDraftFilters] = useState<Record<string, string[]>>({});
  const [filterSheetTranslateY] = useState(() => new Animated.Value(1000));
  const [sortSheetTranslateY] = useState(() => new Animated.Value(1000));

  useEffect(() => {
    if (isFilterVisible) {
      // animate only the filter sheet, not the dimmed background.
      Animated.spring(filterSheetTranslateY, {
        toValue: 0,
        damping: 24,
        stiffness: 200,
        useNativeDriver: true,
      }).start();
    } else {
      filterSheetTranslateY.setValue(1000);
    }
  }, [filterSheetTranslateY, isFilterVisible]);

  useEffect(() => {
    if (isSortVisible) {
      // animate only the sort sheet, not the dimmed background.
      Animated.spring(sortSheetTranslateY, {
        toValue: 0,
        damping: 24,
        stiffness: 200,
        useNativeDriver: true,
      }).start();
    } else {
      sortSheetTranslateY.setValue(1000);
    }
  }, [sortSheetTranslateY, isSortVisible]);

  function openFilters() {
    // start with the filters that are already active.
    setDraftFilters(
      Object.fromEntries(
        filterSections.map((section) => [
          section.id,
          [...section.selectedValues],
        ]),
      ),
    );
    setIsFilterVisible(true);
  }

  function toggleFilterOption(sectionId: string, value: string) {
    // add an option to its group, or remove it if already selected.
    setDraftFilters((currentFilters) => {
      const selectedValues = currentFilters[sectionId] ?? [];
      return {
        ...currentFilters,
        [sectionId]: selectedValues.includes(value)
          ? selectedValues.filter((selectedValue) => selectedValue !== value)
          : [...selectedValues, value],
      };
    });
  }

  function clearFilters() {
    // clear the pending choices in every filter group.
    setDraftFilters(
      Object.fromEntries(filterSections.map((section) => [section.id, []])),
    );
  }

  // preview the number of results before applying the pending filters.
  const draftResultCount = getResultCount(draftFilters);

  return (
    <>
      <View style={styles.catalogControls}>
        <TouchableOpacity
          style={styles.catalogControlButton}
          onPress={openFilters}
        >
          <Ionicons name="options-outline" size={20} color={COLORS.accent} />
          <Text style={styles.catalogControlText}>Filter</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.catalogControlButton}
          onPress={() => setIsSortVisible(true)}
        >
          <Ionicons
            name="swap-vertical-outline"
            size={20}
            color={COLORS.accent}
          />
          <Text style={styles.catalogControlText}>Sort by</Text>
        </TouchableOpacity>
      </View>

      <Modal
        visible={isFilterVisible}
        transparent
        // keep the backdrop still while the sheet has its own animation.
        animationType="none"
        onRequestClose={() => setIsFilterVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <Animated.View
            style={[
              styles.bottomSheet,
              { transform: [{ translateY: filterSheetTranslateY }] },
            ]}
          >
            <View style={styles.sheetHeader}>
              <Text style={styles.sheetTitle}>Filter</Text>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setIsFilterVisible(false)}
              >
                <Ionicons name="close" size={24} color={COLORS.primary} />
              </TouchableOpacity>
            </View>

            <ScrollView
              style={styles.filterOptions}
              showsVerticalScrollIndicator={false}
            >
              {/* show one set of choices for each filter group. */}
              {filterSections.map((section) => (
                <View key={section.id}>
                  <Text style={styles.filterSectionTitle}>
                    {section.title}
                  </Text>
                  <View style={styles.optionList}>
                    {section.options.map((option) => {
                      const isSelected = (
                        draftFilters[section.id] ?? []
                      ).includes(option);
                      return (
                        <TouchableOpacity
                          key={option}
                          style={[
                            styles.filterOption,
                            section.isSize && styles.sizeFilterOption,
                            isSelected && styles.selectedFilterOption,
                          ]}
                          onPress={() =>
                            toggleFilterOption(section.id, option)
                          }
                        >
                          <Text
                            style={[
                              styles.filterOptionText,
                              isSelected && styles.selectedFilterOptionText,
                            ]}
                          >
                            {option}
                          </Text>
                        </TouchableOpacity>
                      );
                    })}
                  </View>
                </View>
              ))}
            </ScrollView>

            <View style={styles.filterFooter}>
              <TouchableOpacity
                style={styles.clearButton}
                onPress={clearFilters}
              >
                <Text style={styles.clearButtonText}>Clear</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.applyButton}
                onPress={() => {
                  // apply the pending choices and close the filter sheet.
                  onApplyFilters(draftFilters);
                  setIsFilterVisible(false);
                }}
              >
                <Text style={styles.applyButtonText}>
                  Show {draftResultCount}{" "}
                  {draftResultCount === 1 ? "product" : "products"}
                </Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
        </View>
      </Modal>

      <Modal
        visible={isSortVisible}
        transparent
        // keep the backdrop still while the sheet has its own animation.
        animationType="none"
        onRequestClose={() => setIsSortVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <Animated.View
            style={[
              styles.sortSheet,
              { transform: [{ translateY: sortSheetTranslateY }] },
            ]}
          >
            <View style={styles.sheetHeader}>
              <Text style={styles.sheetTitle}>Sort by</Text>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setIsSortVisible(false)}
              >
                <Ionicons name="close" size={24} color={COLORS.primary} />
              </TouchableOpacity>
            </View>
            {/* show each sort choice and mark the active one. */}
            {sortOptions.map((option) => {
              const isSelected = selectedSort === option.value;
              return (
                <TouchableOpacity
                  key={option.value}
                  style={styles.sortOption}
                  onPress={() => {
                    // apply the selected sort option and close the sheet.
                    onSortChange(option.value);
                    setIsSortVisible(false);
                  }}
                >
                  <Text style={styles.sortOptionText}>{option.label}</Text>
                  {isSelected && (
                    <Ionicons
                      name="checkmark"
                      size={22}
                      color={COLORS.accent}
                    />
                  )}
                </TouchableOpacity>
              );
            })}
          </Animated.View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  catalogControls: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 20,
    marginTop: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E5EA",
  },
  catalogControlButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    minHeight: 48,
  },
  catalogControlText: {
    color: COLORS.primary,
    fontSize: 14,
    fontWeight: "600",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: COLORS.overlay,
  },
  bottomSheet: {
    maxHeight: "85%",
    backgroundColor: COLORS.background,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 8,
    paddingBottom: 24,
  },
  sortSheet: {
    backgroundColor: COLORS.background,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 8,
    paddingBottom: 24,
  },
  sheetHeader: {
    position: "relative",
    minHeight: 52,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E5EA",
  },
  sheetTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: COLORS.primary,
    textAlign: "center",
  },
  closeButton: {
    position: "absolute",
    right: 20,
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  filterOptions: {
    paddingHorizontal: 20,
  },
  filterSectionTitle: {
    marginTop: 20,
    marginBottom: 10,
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.primary,
  },
  optionList: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  filterOption: {
    minHeight: 40,
    justifyContent: "center",
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: "#D5D5D5",
    borderRadius: 20,
  },
  sizeFilterOption: {
    minWidth: 48,
    alignItems: "center",
  },
  selectedFilterOption: {
    borderColor: COLORS.accent,
    backgroundColor: COLORS.accent,
  },
  filterOptionText: {
    color: COLORS.primary,
    fontSize: 14,
  },
  selectedFilterOptionText: {
    color: COLORS.background,
  },
  filterFooter: {
    flexDirection: "row",
    gap: 12,
    paddingHorizontal: 20,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: "#E5E5EA",
  },
  clearButton: {
    minWidth: 96,
    minHeight: 48,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#D5D5D5",
    borderRadius: 12,
  },
  clearButtonText: {
    color: COLORS.primary,
    fontSize: 15,
    fontWeight: "600",
  },
  applyButton: {
    flex: 1,
    minHeight: 48,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.accent,
    borderRadius: 12,
  },
  applyButtonText: {
    color: COLORS.background,
    fontSize: 15,
    fontWeight: "600",
  },
  sortOption: {
    minHeight: 52,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E5EA",
  },
  sortOptionText: {
    color: COLORS.primary,
    fontSize: 15,
  },
});
