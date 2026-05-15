"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

// Types
export interface SiteData {
  latitude: string;
  longitude: string;
  area: string;
  address: string;
  confirmed: boolean;
}

export interface SiteAnalysis {
  roadAccess: string;
  sunPath: string;
  windDirection: string;
  topography: string;
  views: string;
  noise: string;
  landmarks: string;
  climate: string;
  vegetation: string;
}

export interface ContextStudy {
  urbanDensity: string;
  buildingHeight: string;
  streetWidth: string;
  landUse: string;
  strengths: string[];
  weaknesses: string[];
  opportunities: string[];
  threats: string[];
  recommendations: string[];
}

export interface ClientBrief {
  bedrooms: string;
  livingAreas: string;
  homeOffice: string;
  garage: string;
  mustHave: string;
  avoid: string;
  privacy: string;
  sustainability: string;
}

export interface PersonalityProfile {
  name: string;
  description: string;
  tags: string[];
  answers: Record<string, string>;
}

export interface InspirationItem {
  id: string;
  emoji: string;
  label: string;
  category: string;
  selected: boolean;
}

export interface ProgramZone {
  name: string;
  spaces: { name: string; area: string }[];
}

export interface ZoningDiagram {
  id: string;
  timestamp: number;
  zones: {
    name: string;
    position: { x: number; y: number };
    size: number;
    connections: string[];
  }[];
  circulationType: string;
  privacyGradient: string;
  adjacencyPriority: string;
}

export interface ConceptDirection {
  id: string;
  name: string;
  description: string;
  isPrimary: boolean;
  timestamp: number;
}

export interface MassingOption {
  id: string;
  name: string;
  description: string;
  type: string;
  timestamp: number;
}

export interface VisualizationRender {
  id: string;
  name: string;
  category: string;
  emoji: string;
  timestamp: number;
}

export interface HistoryItem<T> {
  id: string;
  timestamp: number;
  data: T;
}

export interface ProjectState {
  // Project Info
  projectName: string;
  projectType: string;
  projectStatus: string;

  // Site Data
  siteData: SiteData;
  siteDataHistory: HistoryItem<SiteData>[];

  // Site Analysis
  siteAnalysis: SiteAnalysis;
  siteAnalysisHistory: HistoryItem<SiteAnalysis>[];

  // Context Study
  contextStudy: ContextStudy;
  contextStudyHistory: HistoryItem<ContextStudy>[];

  // Client Brief
  clientBrief: ClientBrief;
  clientBriefHistory: HistoryItem<ClientBrief>[];

  // Personality
  personalityProfile: PersonalityProfile;
  personalityHistory: HistoryItem<PersonalityProfile>[];

  // Inspiration
  inspirationItems: InspirationItem[];
  inspirationHistory: HistoryItem<InspirationItem[]>[];

  // Program
  programZones: ProgramZone[];
  programHistory: HistoryItem<ProgramZone[]>[];

  // Zoning
  zoningDiagram: ZoningDiagram | null;
  zoningHistory: HistoryItem<ZoningDiagram>[];

  // Concept
  concepts: ConceptDirection[];
  conceptHistory: HistoryItem<ConceptDirection[]>[];

  // Massing
  massingOptions: MassingOption[];
  massingHistory: HistoryItem<MassingOption[]>[];

  // Visualizations
  exteriorRenders: VisualizationRender[];
  interiorRenders: VisualizationRender[];
  landscapeRenders: VisualizationRender[];
  visualizationHistory: HistoryItem<VisualizationRender[]>[];

  // Completion tracking
  completionStatus: Record<string, number>;

  // Actions
  setProjectName: (name: string) => void;
  setSiteData: (data: Partial<SiteData>) => void;
  confirmSite: () => void;
  setSiteAnalysis: (analysis: Partial<SiteAnalysis>) => void;
  generateSiteAnalysis: () => void;
  setContextStudy: (study: Partial<ContextStudy>) => void;
  generateContextStudy: () => void;
  setClientBrief: (brief: Partial<ClientBrief>) => void;
  saveClientBrief: () => void;
  setPersonalityAnswer: (questionId: string, answer: string) => void;
  generatePersonalityProfile: () => void;
  toggleInspiration: (id: string) => void;
  addInspiration: (item: Omit<InspirationItem, "id" | "selected">) => void;
  generateProgram: (prompt: string) => void;
  generateZoning: () => void;
  generateConcepts: (prompt: string) => void;
  selectPrimaryConcept: (id: string) => void;
  generateMassing: (prompt: string) => void;
  generateExteriorRenders: (prompt: string) => void;
  generateInteriorRenders: (prompt: string, room: string) => void;
  generateLandscapeRenders: (prompt: string) => void;
  updateCompletion: (section: string, value: number) => void;
  getHistoryForSection: <T>(section: string) => HistoryItem<T>[];
  restoreFromHistory: <T>(section: string, historyId: string) => void;
  resetProject: () => void;
}

const generateId = () => Math.random().toString(36).substring(2, 9);

const initialSiteData: SiteData = {
  latitude: "24.7136",
  longitude: "46.6753",
  area: "850",
  address: "Al Nakheel District, Riyadh, KSA",
  confirmed: false,
};

const initialSiteAnalysis: SiteAnalysis = {
  roadAccess: "Excellent",
  sunPath: "Favorable",
  windDirection: "Optimizable",
  topography: "Flat",
  views: "West Priority",
  noise: "Low Impact",
  landmarks: "Strong Context",
  climate: "Hot Arid",
  vegetation: "Plantable",
};

const initialContextStudy: ContextStudy = {
  urbanDensity: "Medium",
  buildingHeight: "G+2 Average",
  streetWidth: "20m Primary",
  landUse: "Residential",
  strengths: ["Prime location", "Good infrastructure", "Low traffic"],
  weaknesses: ["Limited shade", "Hot climate"],
  opportunities: ["View corridors", "Community integration"],
  threats: ["Dust storms", "Future development"],
  recommendations: [
    "Orient main living spaces toward the west for optimal views",
    "Implement deep overhangs and mashrabiya screens for solar protection",
    "Create a central courtyard for natural ventilation and privacy",
  ],
};

const initialClientBrief: ClientBrief = {
  bedrooms: "5",
  livingAreas: "3",
  homeOffice: "yes",
  garage: "3",
  mustHave: "",
  avoid: "",
  privacy: "high",
  sustainability: "high",
};

const initialPersonalityProfile: PersonalityProfile = {
  name: "",
  description: "",
  tags: [],
  answers: {},
};

const defaultInspirationItems: InspirationItem[] = [
  { id: "1", emoji: "🏛️", label: "Modern Minimalism", category: "Architecture", selected: false },
  { id: "2", emoji: "🌿", label: "Biophilic Design", category: "Architecture", selected: false },
  { id: "3", emoji: "🏜️", label: "Desert Modern", category: "Architecture", selected: false },
  { id: "4", emoji: "🪟", label: "Glass Pavilion", category: "Architecture", selected: false },
  { id: "5", emoji: "🧱", label: "Textured Concrete", category: "Materials", selected: false },
  { id: "6", emoji: "🪵", label: "Warm Wood Accents", category: "Materials", selected: false },
  { id: "7", emoji: "💫", label: "Ambient Lighting", category: "Mood", selected: false },
  { id: "8", emoji: "🌅", label: "Golden Hour Views", category: "Mood", selected: false },
  { id: "9", emoji: "🌴", label: "Oasis Garden", category: "Landscape", selected: false },
];

const initialCompletionStatus: Record<string, number> = {
  "site-selection": 0,
  "site-analysis": 0,
  "context-study": 0,
  "client-brief": 0,
  personality: 0,
  inspiration: 0,
  program: 0,
  zoning: 0,
  concept: 0,
  massing: 0,
  exterior: 0,
  interior: 0,
  landscape: 0,
  sustainability: 0,
  cost: 0,
  visualization: 0,
};

export const useProjectStore = create<ProjectState>()(
  persist(
    (set, get) => ({
      // Initial state
      projectName: "Al Nakheel Residence",
      projectType: "Luxury Villa",
      projectStatus: "In Progress",
      siteData: initialSiteData,
      siteDataHistory: [],
      siteAnalysis: initialSiteAnalysis,
      siteAnalysisHistory: [],
      contextStudy: initialContextStudy,
      contextStudyHistory: [],
      clientBrief: initialClientBrief,
      clientBriefHistory: [],
      personalityProfile: initialPersonalityProfile,
      personalityHistory: [],
      inspirationItems: defaultInspirationItems,
      inspirationHistory: [],
      programZones: [],
      programHistory: [],
      zoningDiagram: null,
      zoningHistory: [],
      concepts: [],
      conceptHistory: [],
      massingOptions: [],
      massingHistory: [],
      exteriorRenders: [],
      interiorRenders: [],
      landscapeRenders: [],
      visualizationHistory: [],
      completionStatus: initialCompletionStatus,

      // Actions
      setProjectName: (name) => set({ projectName: name }),

      setSiteData: (data) =>
        set((state) => ({
          siteData: { ...state.siteData, ...data },
        })),

      confirmSite: () => {
        const state = get();
        const historyItem: HistoryItem<SiteData> = {
          id: generateId(),
          timestamp: Date.now(),
          data: { ...state.siteData, confirmed: true },
        };
        set({
          siteData: { ...state.siteData, confirmed: true },
          siteDataHistory: [...state.siteDataHistory, historyItem],
          completionStatus: { ...state.completionStatus, "site-selection": 100 },
        });
      },

      setSiteAnalysis: (analysis) =>
        set((state) => ({
          siteAnalysis: { ...state.siteAnalysis, ...analysis },
        })),

      generateSiteAnalysis: () => {
        const state = get();
        // Generate analysis based on site data
        const lat = parseFloat(state.siteData.latitude);
        const analysis: SiteAnalysis = {
          roadAccess: lat > 24 ? "Excellent" : "Good",
          sunPath: "Favorable",
          windDirection: lat > 24 ? "NW Prevailing" : "NE Prevailing",
          topography: parseFloat(state.siteData.area) > 1000 ? "Varied" : "Flat",
          views: "West Priority",
          noise: "Low Impact",
          landmarks: "Strong Context",
          climate: lat > 25 ? "Hot Arid" : "Hot Humid",
          vegetation: "Plantable",
        };
        const historyItem: HistoryItem<SiteAnalysis> = {
          id: generateId(),
          timestamp: Date.now(),
          data: analysis,
        };
        set({
          siteAnalysis: analysis,
          siteAnalysisHistory: [...state.siteAnalysisHistory, historyItem],
          completionStatus: { ...state.completionStatus, "site-analysis": 100 },
        });
      },

      setContextStudy: (study) =>
        set((state) => ({
          contextStudy: { ...state.contextStudy, ...study },
        })),

      generateContextStudy: () => {
        const state = get();
        const historyItem: HistoryItem<ContextStudy> = {
          id: generateId(),
          timestamp: Date.now(),
          data: state.contextStudy,
        };
        set({
          contextStudyHistory: [...state.contextStudyHistory, historyItem],
          completionStatus: { ...state.completionStatus, "context-study": 100 },
        });
      },

      setClientBrief: (brief) =>
        set((state) => ({
          clientBrief: { ...state.clientBrief, ...brief },
        })),

      saveClientBrief: () => {
        const state = get();
        const historyItem: HistoryItem<ClientBrief> = {
          id: generateId(),
          timestamp: Date.now(),
          data: { ...state.clientBrief },
        };
        set({
          clientBriefHistory: [...state.clientBriefHistory, historyItem],
          completionStatus: { ...state.completionStatus, "client-brief": 100 },
        });
      },

      setPersonalityAnswer: (questionId, answer) =>
        set((state) => ({
          personalityProfile: {
            ...state.personalityProfile,
            answers: { ...state.personalityProfile.answers, [questionId]: answer },
          },
        })),

      generatePersonalityProfile: () => {
        const state = get();
        const answers = state.personalityProfile.answers;
        
        // Determine personality based on answers
        let name = "The Modern Minimalist";
        let description = "Values clean lines, open spaces, and functional elegance.";
        let tags = ["Minimalist", "Contemporary", "Light-Focused"];

        const answerValues = Object.values(answers);
        if (answerValues.includes("traditional")) {
          name = "The Heritage Curator";
          description = "Appreciates cultural richness, ornate details, and timeless craftsmanship.";
          tags = ["Traditional", "Ornate", "Cultural"];
        } else if (answerValues.includes("nature")) {
          name = "The Biophilic Dweller";
          description = "Seeks harmony with nature, organic materials, and sustainable living.";
          tags = ["Biophilic", "Sustainable", "Organic"];
        } else if (answerValues.includes("bold")) {
          name = "The Bold Visionary";
          description = "Embraces dramatic forms, innovative materials, and statement architecture.";
          tags = ["Bold", "Innovative", "Dramatic"];
        }

        const profile: PersonalityProfile = {
          name,
          description,
          tags,
          answers,
        };
        const historyItem: HistoryItem<PersonalityProfile> = {
          id: generateId(),
          timestamp: Date.now(),
          data: profile,
        };
        set({
          personalityProfile: profile,
          personalityHistory: [...state.personalityHistory, historyItem],
          completionStatus: { ...state.completionStatus, personality: 100 },
        });
      },

      toggleInspiration: (id) =>
        set((state) => {
          const items = state.inspirationItems.map((item) =>
            item.id === id ? { ...item, selected: !item.selected } : item
          );
          const selectedCount = items.filter((i) => i.selected).length;
          return {
            inspirationItems: items,
            completionStatus: {
              ...state.completionStatus,
              inspiration: Math.min(100, selectedCount * 20),
            },
          };
        }),

      addInspiration: (item) =>
        set((state) => ({
          inspirationItems: [
            ...state.inspirationItems,
            { ...item, id: generateId(), selected: true },
          ],
        })),

      generateProgram: (prompt) => {
        const state = get();
        const brief = state.clientBrief;
        const personality = state.personalityProfile;
        
        // Generate program based on brief and personality
        const zones: ProgramZone[] = [
          {
            name: "Public Zone",
            spaces: [
              { name: "Majlis", area: personality.tags.includes("Traditional") ? "65" : "55" },
              { name: "Formal Dining", area: "45" },
              { name: "Guest Suite", area: "35" },
            ],
          },
          {
            name: "Semi-Private Zone",
            spaces: [
              { name: "Family Living", area: brief.livingAreas === "3" ? "75" : "55" },
              { name: "Family Dining", area: "40" },
              { name: "Home Office", area: brief.homeOffice === "yes" ? "25" : "0" },
            ],
          },
          {
            name: "Private Zone",
            spaces: [
              { name: "Master Suite", area: "85" },
              { name: `Bedrooms (${brief.bedrooms})`, area: String(parseInt(brief.bedrooms) * 30) },
            ],
          },
          {
            name: "Service Zone",
            spaces: [
              { name: "Kitchen", area: "45" },
              { name: "Laundry", area: "15" },
              { name: `Garage (${brief.garage} cars)`, area: String(parseInt(brief.garage) * 25) },
            ],
          },
          {
            name: "Leisure Zone",
            spaces: [
              { name: "Home Cinema", area: personality.tags.includes("Bold") ? "45" : "35" },
              { name: "Gym", area: "30" },
              { name: "Pool", area: "60" },
            ],
          },
          {
            name: "Hidden Program",
            spaces: [
              { name: "Storage", area: "25" },
              { name: "MEP Room", area: "20" },
              { name: "Staff Quarters", area: "40" },
            ],
          },
        ];

        const historyItem: HistoryItem<ProgramZone[]> = {
          id: generateId(),
          timestamp: Date.now(),
          data: zones,
        };
        set({
          programZones: zones,
          programHistory: [...state.programHistory, historyItem],
          completionStatus: { ...state.completionStatus, program: 100 },
        });
      },

      generateZoning: () => {
        const state = get();
        const program = state.programZones;
        const brief = state.clientBrief;
        
        // Generate zoning diagram based on program and privacy preferences
        const diagram: ZoningDiagram = {
          id: generateId(),
          timestamp: Date.now(),
          zones: [
            { name: "PUBLIC", position: { x: 50, y: 30 }, size: 60, connections: ["SEMI-PVT", "SERVICE"] },
            { name: "SEMI-PVT", position: { x: 30, y: 50 }, size: 50, connections: ["PUBLIC", "PRIVATE", "COURTYARD"] },
            { name: "PRIVATE", position: { x: 70, y: 70 }, size: 55, connections: ["SEMI-PVT", "COURTYARD"] },
            { name: "SERVICE", position: { x: 80, y: 30 }, size: 40, connections: ["PUBLIC", "PRIVATE"] },
            { name: "LEISURE", position: { x: 20, y: 70 }, size: 45, connections: ["SEMI-PVT", "COURTYARD"] },
            { name: "COURTYARD", position: { x: 50, y: 55 }, size: 35, connections: ["SEMI-PVT", "PRIVATE", "LEISURE"] },
          ],
          circulationType: brief.privacy === "high" ? "Separated Flow" : "Open Flow",
          privacyGradient: brief.privacy === "high" ? "Strong Gradient" : "Soft Transition",
          adjacencyPriority: "Family-Centric",
        };

        const historyItem: HistoryItem<ZoningDiagram> = {
          id: generateId(),
          timestamp: Date.now(),
          data: diagram,
        };
        set({
          zoningDiagram: diagram,
          zoningHistory: [...state.zoningHistory, historyItem],
          completionStatus: { ...state.completionStatus, zoning: 100 },
        });
      },

      generateConcepts: (prompt) => {
        const state = get();
        const personality = state.personalityProfile;
        const inspiration = state.inspirationItems.filter((i) => i.selected);
        
        // Generate concepts based on personality and inspiration
        const concepts: ConceptDirection[] = [
          {
            id: generateId(),
            name: "The Desert Lantern",
            description: personality.tags.includes("Minimalist")
              ? "A luminous volume that glows softly at night, with perforated screens filtering harsh daylight into delicate patterns."
              : "A bold sculptural form that commands attention while respecting traditional proportions and materials.",
            isPrimary: true,
            timestamp: Date.now(),
          },
          {
            id: generateId(),
            name: "Stratified Horizons",
            description: "Horizontal planes stack and slide to create deep overhangs and layered terraces, maximizing shade and views.",
            isPrimary: false,
            timestamp: Date.now(),
          },
          {
            id: generateId(),
            name: "The Carved Monolith",
            description: inspiration.some((i) => i.label.includes("Concrete"))
              ? "A massive stone-like form with courtyards and voids carved from its mass, creating intimate outdoor rooms."
              : "An experimental approach that treats the building as a single sculptural object shaped by wind and light.",
            isPrimary: false,
            timestamp: Date.now(),
          },
        ];

        const historyItem: HistoryItem<ConceptDirection[]> = {
          id: generateId(),
          timestamp: Date.now(),
          data: concepts,
        };
        set({
          concepts,
          conceptHistory: [...state.conceptHistory, historyItem],
          completionStatus: { ...state.completionStatus, concept: 100 },
        });
      },

      selectPrimaryConcept: (id) =>
        set((state) => ({
          concepts: state.concepts.map((c) => ({
            ...c,
            isPrimary: c.id === id,
          })),
        })),

      generateMassing: (prompt) => {
        const state = get();
        const concept = state.concepts.find((c) => c.isPrimary);
        const zoning = state.zoningDiagram;
        
        // Generate massing based on concept and zoning
        const options: MassingOption[] = [
          {
            id: generateId(),
            name: "Courtyard Ring",
            description: concept?.name.includes("Lantern")
              ? "Rooms wrap around a central courtyard, with the lantern element rising from the center."
              : "Traditional courtyard typology with contemporary expression.",
            type: "courtyard",
            timestamp: Date.now(),
          },
          {
            id: generateId(),
            name: "L-Shape Wrap",
            description: "Two wings create a protected outdoor space, optimal for the climate and privacy requirements.",
            type: "l-shape",
            timestamp: Date.now(),
          },
          {
            id: generateId(),
            name: "Spine + Wings",
            description: zoning?.circulationType === "Separated Flow"
              ? "A central spine separates public and private wings, with controlled access points."
              : "A linear organization with branching volumes for different program zones.",
            type: "spine",
            timestamp: Date.now(),
          },
          {
            id: generateId(),
            name: "Stacked Terrace",
            description: "Volumes step up from the landscape, creating terraces at each level for outdoor living.",
            type: "stacked",
            timestamp: Date.now(),
          },
          {
            id: generateId(),
            name: "U-Form",
            description: "Three-sided enclosure creates a grand entry court while maximizing garden interface.",
            type: "u-form",
            timestamp: Date.now(),
          },
          {
            id: generateId(),
            name: "Monolith Carved",
            description: concept?.name.includes("Monolith")
              ? "A unified mass with strategic voids carved out for light, air, and views."
              : "A bold singular form that is subtracted from to create interior spaces.",
            type: "monolith",
            timestamp: Date.now(),
          },
        ];

        const historyItem: HistoryItem<MassingOption[]> = {
          id: generateId(),
          timestamp: Date.now(),
          data: options,
        };
        set({
          massingOptions: options,
          massingHistory: [...state.massingHistory, historyItem],
          completionStatus: { ...state.completionStatus, massing: 100 },
        });
      },

      generateExteriorRenders: (prompt) => {
        const state = get();
        const renders: VisualizationRender[] = [
          { id: generateId(), name: "Street Elevation — Day", category: "exterior", emoji: "🏛️", timestamp: Date.now() },
          { id: generateId(), name: "Courtyard — Golden Hour", category: "exterior", emoji: "🌅", timestamp: Date.now() },
          { id: generateId(), name: "Facade Detail — Mashrabiya", category: "exterior", emoji: "🪟", timestamp: Date.now() },
          { id: generateId(), name: "Night Illumination", category: "exterior", emoji: "🌙", timestamp: Date.now() },
        ];
        const historyItem: HistoryItem<VisualizationRender[]> = {
          id: generateId(),
          timestamp: Date.now(),
          data: renders,
        };
        set({
          exteriorRenders: renders,
          visualizationHistory: [...state.visualizationHistory, historyItem],
          completionStatus: { ...state.completionStatus, exterior: 100 },
        });
      },

      generateInteriorRenders: (prompt, room) => {
        const state = get();
        const renders: VisualizationRender[] = [
          { id: generateId(), name: `${room} — Main View`, category: "interior", emoji: "🛋️", timestamp: Date.now() },
          { id: generateId(), name: `${room} — Detail`, category: "interior", emoji: "✨", timestamp: Date.now() },
          { id: generateId(), name: `${room} — Ambient`, category: "interior", emoji: "💫", timestamp: Date.now() },
          { id: generateId(), name: `${room} — Natural Light`, category: "interior", emoji: "☀️", timestamp: Date.now() },
        ];
        const historyItem: HistoryItem<VisualizationRender[]> = {
          id: generateId(),
          timestamp: Date.now(),
          data: [...state.interiorRenders, ...renders],
        };
        set({
          interiorRenders: [...state.interiorRenders, ...renders],
          visualizationHistory: [...state.visualizationHistory, historyItem],
          completionStatus: { ...state.completionStatus, interior: 100 },
        });
      },

      generateLandscapeRenders: (prompt) => {
        const state = get();
        const renders: VisualizationRender[] = [
          { id: generateId(), name: "Garden Overview", category: "landscape", emoji: "🌿", timestamp: Date.now() },
          { id: generateId(), name: "Pool Area", category: "landscape", emoji: "💧", timestamp: Date.now() },
          { id: generateId(), name: "Night Garden", category: "landscape", emoji: "🌙", timestamp: Date.now() },
          { id: generateId(), name: "Entry Approach", category: "landscape", emoji: "🛤️", timestamp: Date.now() },
        ];
        const historyItem: HistoryItem<VisualizationRender[]> = {
          id: generateId(),
          timestamp: Date.now(),
          data: renders,
        };
        set({
          landscapeRenders: renders,
          visualizationHistory: [...state.visualizationHistory, historyItem],
          completionStatus: { ...state.completionStatus, landscape: 100 },
        });
      },

      updateCompletion: (section, value) =>
        set((state) => ({
          completionStatus: { ...state.completionStatus, [section]: value },
        })),

      getHistoryForSection: <T,>(section: string): HistoryItem<T>[] => {
        const state = get();
        const historyMap: Record<string, HistoryItem<unknown>[]> = {
          "site-selection": state.siteDataHistory,
          "site-analysis": state.siteAnalysisHistory,
          "context-study": state.contextStudyHistory,
          "client-brief": state.clientBriefHistory,
          personality: state.personalityHistory,
          inspiration: state.inspirationHistory,
          program: state.programHistory,
          zoning: state.zoningHistory,
          concept: state.conceptHistory,
          massing: state.massingHistory,
          visualization: state.visualizationHistory,
        };
        return (historyMap[section] || []) as HistoryItem<T>[];
      },

      restoreFromHistory: <T,>(section: string, historyId: string) => {
        const state = get();
        const history = state.getHistoryForSection<T>(section);
        const item = history.find((h) => h.id === historyId);
        if (!item) return;

        const restoreMap: Record<string, () => void> = {
          "site-selection": () => set({ siteData: item.data as SiteData }),
          "site-analysis": () => set({ siteAnalysis: item.data as SiteAnalysis }),
          "context-study": () => set({ contextStudy: item.data as ContextStudy }),
          "client-brief": () => set({ clientBrief: item.data as ClientBrief }),
          personality: () => set({ personalityProfile: item.data as PersonalityProfile }),
          inspiration: () => set({ inspirationItems: item.data as InspirationItem[] }),
          program: () => set({ programZones: item.data as ProgramZone[] }),
          zoning: () => set({ zoningDiagram: item.data as ZoningDiagram }),
          concept: () => set({ concepts: item.data as ConceptDirection[] }),
          massing: () => set({ massingOptions: item.data as MassingOption[] }),
        };

        restoreMap[section]?.();
      },

      resetProject: () =>
        set({
          siteData: initialSiteData,
          siteDataHistory: [],
          siteAnalysis: initialSiteAnalysis,
          siteAnalysisHistory: [],
          contextStudy: initialContextStudy,
          contextStudyHistory: [],
          clientBrief: initialClientBrief,
          clientBriefHistory: [],
          personalityProfile: initialPersonalityProfile,
          personalityHistory: [],
          inspirationItems: defaultInspirationItems,
          inspirationHistory: [],
          programZones: [],
          programHistory: [],
          zoningDiagram: null,
          zoningHistory: [],
          concepts: [],
          conceptHistory: [],
          massingOptions: [],
          massingHistory: [],
          exteriorRenders: [],
          interiorRenders: [],
          landscapeRenders: [],
          visualizationHistory: [],
          completionStatus: initialCompletionStatus,
        }),
    }),
    {
      name: "archi-hub-project",
    }
  )
);
