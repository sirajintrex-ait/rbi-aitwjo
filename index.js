// --- Supabase Config ---
const SUPABASE_URL = 'https://YOUR_PROJECT_REF.supabase.co';
const SUPABASE_KEY = 'YOUR_ANON_PUBLIC_KEY';

// Init client
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// Cache DOM Elements
const form = document.getElementById('asset-form');
const btnSave = document.getElementById('btn-save-db');
const btnRefresh = document.getElementById('btn-refresh');
const eqTagInput = document.getElementById('eq_tag');

// 🔄 1. Load data from Supabase
async function loadDataFromSupabase() {
  const tag = eqTagInput.value;

  const { data, error } = await supabase
    .from('asset_register')
    .select('*')
    .eq('equipment_tag', tag)
    .single();

  if (error) {
    console.error("Error loading data:", error);
    alert("Record not found or network error.");
    return;
  }

  if (data) {
    document.getElementById('vessel_name').value = data.vessel_name || '';
    document.getElementById('description').value = data.description || '';
    document.getElementById('equipment_type').value = data.equipment_type || 'Pressure Vessel';
    document.getElementById('site_facility').value = data.site_facility || 'Horse Shoe Falls';
    document.getElementById('unit_area').value = data.unit_area || 'Dehydration';
    document.getElementById('system_name').value = data.system_name || 'System 1';
    document.getElementById('design_temperature_c').value = data.design_temperature_c || 0;
    document.getElementById('design_pressure_mpa').value = data.design_pressure_mpa || 0;
    document.getElementById('nominal_thickness_mm').value = data.nominal_thickness_mm || 0;
    document.getElementById('corrosion_allowance_mm').value = data.corrosion_allowance_mm || 0;
    document.getElementById('operating_pressure_mpa').value = data.operating_pressure_mpa || 0;
    document.getElementById('operating_temperature_c').value = data.operating_temperature_c || 0;
    document.getElementById('vessel_liquid_level_percent').value = data.vessel_liquid_level_percent || 0;
  }
}

// 💾 2. Upsert Data into Supabase
async function saveDataToSupabase() {
  const payload = {
    equipment_tag: eqTagInput.value,
    vessel_name: document.getElementById('vessel_name').value,
    description: document.getElementById('description').value,
    equipment_type: document.getElementById('equipment_type').value,
    site_facility: document.getElementById('site_facility').value,
    unit_area: document.getElementById('unit_area').value,
    system_name: document.getElementById('system_name').value,
    design_temperature_c: parseFloat(document.getElementById('design_temperature_c').value),
    design_pressure_mpa: parseFloat(document.getElementById('design_pressure_mpa').value),
    nominal_thickness_mm: parseFloat(document.getElementById('nominal_thickness_mm').value),
    corrosion_allowance_mm: parseFloat(document.getElementById('corrosion_allowance_mm').value),
    operating_pressure_mpa: parseFloat(document.getElementById('operating_pressure_mpa').value),
    operating_temperature_c: parseFloat(document.getElementById('operating_temperature_c').value),
    vessel_liquid_level_percent: parseFloat(document.getElementById('vessel_liquid_level_percent').value)
  };

  const { data, error } = await supabase
    .from('asset_register')
    .upsert(payload, { onConflict: 'equipment_tag' });

  if (error) {
    console.error("Upsert failed:", error);
    alert("Fail to upsert: " + error.message);
  } else {
    alert("Record Saved successfully!");
  }
}

// Attaching Event listeners
btnSave.addEventListener('click', saveDataToSupabase);
btnRefresh.addEventListener('click', loadDataFromSupabase);

// Automatically load default 'V-1001' row on boot
window.addEventListener('DOMContentLoaded', loadDataFromSupabase);
