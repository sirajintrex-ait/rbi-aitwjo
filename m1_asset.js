<script>
    // 1. UPDATE THIS TO YOUR PUBLIC CODESPACE URL
    const API_URL = "https://cuddly-spoon-q7wxjqjr6r4w2v9j-8000.app.github.dev";

    // 2. CONNECTION CHECK
    async function checkConnection() {
        try {
            const response = await fetch(`${API_URL}/`);
            const data = await response.json();
            alert("✅ Backend Live: " + (data.message || "Connected"));
        } catch (err) {
            alert("❌ Connection Failed! Ensure Codespace Port 8000 is PUBLIC.");
        }
    }

    // 3. SAVE TO DATABASE
    document.getElementById('saveBtn').onclick = async () => {
        const assetData = {
            tag: document.getElementById('tag').value,
            vessel_name: document.getElementById('vessel_name').value,
            description: document.getElementById('description').value,
            equipment_type: document.getElementById('equipment_type').value,
            site: document.getElementById('site').value,
            unit: document.getElementById('unit').value,
            system: document.getElementById('system').value,
            design_temp: parseFloat(document.getElementById('design_temp').value),
            design_press: parseFloat(document.getElementById('design_press').value),
            nominal_thick: parseFloat(document.getElementById('nominal_thick').value),
            corrosion_allow: parseFloat(document.getElementById('corrosion_allow').value),
            operating_press: parseFloat(document.getElementById('operating_press').value),
            operating_temp: parseFloat(document.getElementById('operating_temp').value),
            liquid_level: parseFloat(document.getElementById('liquid_level').value)
        };

        try {
            const response = await fetch(`${API_URL}/assets/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(assetData)
            });

            const result = await response.json();
            if (response.ok) {
                alert("✅ Success! Asset saved to Supabase.");
            } else {
                alert("❌ Error: " + (result.detail || "Save failed"));
            }
        } catch (err) {
            alert("❌ Network Error: Could not reach backend.");
        }
    };

    // 4. LOAD DATA BY TAG
    document.getElementById('loadBtn').onclick = async () => {
        const tag = document.getElementById('tag').value;
        try {
            const response = await fetch(`${API_URL}/assets/${tag}`);
            const result = await response.json();
            
            if (response.ok && result.data) {
                const d = result.data;
                // Mapping SQL columns back to HTML IDs
                document.getElementById('vessel_name').value = d.vessel_name || "";
                document.getElementById('description').value = d.description || "";
                document.getElementById('equipment_type').value = d.equipment_type || "";
                document.getElementById('site').value = d.site_facility || "";
                document.getElementById('unit').value = d.unit_area || "";
                document.getElementById('system').value = d.system_name || "";
                document.getElementById('design_temp').value = d.design_temperature_c || 0;
                document.getElementById('design_press').value = d.design_pressure_mpa || 0;
                document.getElementById('nominal_thick').value = d.nominal_thickness_mm || 0;
                document.getElementById('corrosion_allow').value = d.corrosion_allowance_mm || 0;
                document.getElementById('operating_press').value = d.operating_pressure_mpa || 0;
                document.getElementById('operating_temp').value = d.operating_temperature_c || 0;
                document.getElementById('liquid_level').value = d.vessel_liquid_level_percent || 0;
                
                alert("✅ Data loaded for " + tag);
            } else {
                alert("⚠ No asset found with tag: " + tag);
            }
        } catch (err) {
            alert("❌ Failed to load data from server.");
        }
    };
</script>
