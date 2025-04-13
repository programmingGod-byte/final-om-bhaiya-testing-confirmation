const chapter14 = {
  id: 14,
  title: "ASIC Implementation",
  description: "Designing RISC-V processors as application-specific integrated circuits",
  estimatedTime: "4 hours",
  completed: false,
  sections: [
    {
      id: "14.1",
      title: "ASIC Design Flow",
      content: `
        <h3>The Journey from RTL to Silicon</h3>
        <p>Application-Specific Integrated Circuit (ASIC) implementation of RISC-V processors enables maximum performance, power efficiency, and volume scaling compared to FPGA alternatives.</p>
        
        <h4>Front-end Design</h4>
        <p>The initial phase of ASIC design transforms RTL to gate-level representation:</p>
        <ul>
          <li><strong>Specification Development</strong>: Detailed documentation of functionality, performance, power, and area goals</li>
          <li><strong>RTL Design</strong>: RISC-V implementation in Verilog/VHDL/SystemVerilog</li>
          <li><strong>Functional Verification</strong>: Extensive testing using simulation, formal methods, and emulation</li>
          <li><strong>Logic Synthesis</strong>: Conversion from RTL to technology-specific gate-level netlist</li>
          <li><strong>Gate-Level Simulation</strong>: Verifying functionality after synthesis</li>
          <li><strong>Design for Test (DFT)</strong>: Adding testability structures</li>
        </ul>
        
        <div style="text-align: center; margin: 20px 0;">
          <img src="https://i.imgur.com/ZMYnDjP.png" alt="ASIC Design Flow" style="max-width: 700px; width: 100%;">
          <p><em>Complete ASIC design flow for RISC-V processor implementation</em></p>
        </div>
        
        <h4>Logic Synthesis</h4>
        <p>The process of transforming RTL to gate-level representation:</p>
        <ul>
          <li><strong>Technology Library Mapping</strong>: Converting logic to target process node cells</li>
          <li><strong>Constraint-Driven Optimization</strong>: Meeting timing, area, and power goals</li>
          <li><strong>Sequential Optimization</strong>: Retiming, register balancing, and clock gating insertion</li>
          <li><strong>Multiple Corner Analysis</strong>: Ensuring functionality across PVT variations</li>
          <li><strong>Multi-Threshold Libraries</strong>: Using different Vt cells for performance vs. power tradeoffs</li>
          <li><strong>Logic Equivalence Checking</strong>: Verifying synthesis preserves functionality</li>
        </ul>
        
        <h4>Floorplanning</h4>
        <p>Organizing the physical layout of the RISC-V processor:</p>
        <ul>
          <li><strong>Hierarchical Planning</strong>: Determining block placement and boundaries</li>
          <li><strong>Aspect Ratio Determination</strong>: Setting the chip shape</li>
          <li><strong>I/O Ring Planning</strong>: Organizing external connections</li>
          <li><strong>Power Planning</strong>: Structuring the power distribution network</li>
          <li><strong>Macro Placement</strong>: Positioning large blocks like SRAMs (register file, caches, etc.)</li>
          <li><strong>Clock Planning</strong>: Organizing clock distribution network</li>
        </ul>
        
        <h4>Place and Route</h4>
        <p>Transforming the gate-level netlist into a physical layout:</p>
        <ul>
          <li><strong>Cell Placement</strong>: Determining the location of each standard cell</li>
          <li><strong>Clock Tree Synthesis</strong>: Building balanced, low-skew clock distribution</li>
          <li><strong>Routing</strong>: Connecting cells with metal traces</li>
          <li><strong>Optimization</strong>: Iterative refinement for timing, congestion, and DRC</li>
          <li><strong>Fill Generation</strong>: Adding filler cells for manufacturability</li>
          <li><strong>Engineering Change Orders (ECOs)</strong>: Late-stage design modifications</li>
        </ul>
        
        <h4>Static Timing Analysis</h4>
        <p>Ensuring the design meets timing requirements:</p>
        <ul>
          <li><strong>Setup and Hold Analysis</strong>: Verifying proper signal timing relationships</li>
          <li><strong>Multi-Corner Analysis</strong>: Checking timing across process, voltage, and temperature variations</li>
          <li><strong>On-Chip Variation (OCV) Analysis</strong>: Accounting for within-die variations</li>
          <li><strong>Clock Domain Crossing Verification</strong>: Ensuring proper CDC handling</li>
          <li><strong>Signal Integrity Analysis</strong>: Checking for crosstalk and noise effects</li>
          <li><strong>IR Drop Analysis</strong>: Verifying power integrity</li>
        </ul>
      `
    },
    {
      id: "14.2",
      title: "Physical Design Considerations",
      content: `
        <h3>Implementation Details for RISC-V Silicon</h3>
        <p>Physical implementation of RISC-V processors involves numerous technical considerations that affect performance, power, and manufacturability.</p>
        
        <h4>Standard Cell Libraries</h4>
        <p>Selecting and using standard cell libraries effectively:</p>
        <ul>
          <li><strong>Library Selection</strong>: Choosing appropriate libraries for the design goals</li>
          <li><strong>Cell Characterization</strong>: Understanding timing, power, and noise characteristics</li>
          <li><strong>Multi-Vt Strategy</strong>: Using high, standard, and low threshold voltage cells appropriately</li>
          <li><strong>Drive Strength Selection</strong>: Balancing performance and power</li>
          <li><strong>Special Cells</strong>: Utilizing clock cells, level shifters, isolation cells</li>
        </ul>
        
        <div style="text-align: center; margin: 20px 0;">
          <img src="https://i.imgur.com/A2SYnqw.png" alt="ASIC Physical Design" style="max-width: 700px; width: 100%;">
          <p><em>Physical design considerations for a RISC-V processor implementation</em></p>
        </div>
        
        <h4>Clock Tree Synthesis</h4>
        <p>Building an effective clock distribution network:</p>
        <ul>
          <li><strong>Clock Tree Topology</strong>: H-tree, mesh, hybrid approaches</li>
          <li><strong>Buffer Insertion</strong>: Balancing skew and latency with appropriate buffering</li>
          <li><strong>Clock Gating</strong>: Strategic placement of clock gates for power savings</li>
          <li><strong>Skew Management</strong>: Controlling clock arrival variation</li>
          <li><strong>OCV Derating</strong>: Accounting for on-chip variation</li>
          <li><strong>Multi-Corner Optimization</strong>: Ensuring robust operation across conditions</li>
        </ul>
        
        <h4>Power Distribution Network</h4>
        <p>Designing the power delivery infrastructure:</p>
        <ul>
          <li><strong>Power Grid Planning</strong>: Arranging power rings and straps</li>
          <li><strong>IR Drop Analysis</strong>: Ensuring voltage integrity throughout the design</li>
          <li><strong>Decoupling Capacitors</strong>: Strategic placement for noise suppression</li>
          <li><strong>Multiple Power Domains</strong>: Managing different voltage regions</li>
          <li><strong>Power Gating</strong>: Implementing sleep transistors for unused blocks</li>
          <li><strong>Electromigration Analysis</strong>: Ensuring long-term reliability</li>
        </ul>
        
        <h4>Signal Integrity Analysis</h4>
        <p>Maintaining reliable signal transmission:</p>
        <ul>
          <li><strong>Crosstalk Analysis</strong>: Identifying and mitigating interference between signals</li>
          <li><strong>Noise Immunity</strong>: Ensuring robust operation in presence of noise</li>
          <li><strong>Shielding Strategies</strong>: Protecting sensitive signals</li>
          <li><strong>Antenna Effects</strong>: Addressing charge accumulation during manufacturing</li>
          <li><strong>EM/IR Analysis</strong>: Checking for electromagnetic and resistive effects</li>
        </ul>
        
        <h4>DRC/LVS Verification</h4>
        <p>Ensuring manufacturability and correctness:</p>
        <ul>
          <li><strong>Design Rule Checking (DRC)</strong>: Verifying compliance with process manufacturing rules</li>
          <li><strong>Layout vs. Schematic (LVS)</strong>: Confirming layout matches logical design</li>
          <li><strong>Electrical Rule Checking (ERC)</strong>: Verifying proper electrical connections</li>
          <li><strong>Metal Density Checks</strong>: Ensuring uniform metal distribution</li>
          <li><strong>Antenna Rule Checking</strong>: Preventing charge damage during manufacturing</li>
          <li><strong>Advanced Node Rules</strong>: Handling complex requirements of modern processes</li>
        </ul>
      `
    },
    {
      id: "14.3",
      title: "DFT and Testability",
      content: `
        <h3>Ensuring Testable RISC-V Implementations</h3>
        <p>Design for Test (DFT) methodologies are crucial for verifying that manufactured RISC-V processors function correctly.</p>
        
        <h4>Scan Insertion</h4>
        <p>Implementing scan chains for structural testing:</p>
        <ul>
          <li><strong>Scan Architecture</strong>: Determining scan chain organization</li>
          <li><strong>Scan Cell Selection</strong>: Choosing appropriate scan flip-flops</li>
          <li><strong>Scan Insertion Flow</strong>: Integrating scan into the design process</li>
          <li><strong>Scan Compression</strong>: Reducing test data volume and test time</li>
          <li><strong>Scan Power Optimization</strong>: Preventing excessive power during scan testing</li>
          <li><strong>Clock Domain Management</strong>: Handling multiple clock domains in scan mode</li>
        </ul>
        
        <div style="text-align: center; margin: 20px 0;">
          <img src="https://i.imgur.com/nU8Ctks.png" alt="DFT Architecture" style="max-width: 700px; width: 100%;">
          <p><em>Design for Test architecture for a RISC-V processor</em></p>
        </div>
        
        <h4>ATPG (Automatic Test Pattern Generation)</h4>
        <p>Creating effective test patterns:</p>
        <ul>
          <li><strong>Stuck-at Fault Testing</strong>: Detecting nodes stuck at logical 0 or 1</li>
          <li><strong>Transition Fault Testing</strong>: Verifying proper signal transitions</li>
          <li><strong>Path Delay Testing</strong>: Checking critical timing paths</li>
          <li><strong>Bridging Fault Testing</strong>: Finding unintended connections between signals</li>
          <li><strong>Pattern Compaction</strong>: Optimizing test pattern count</li>
          <li><strong>Fault Coverage Analysis</strong>: Measuring test effectiveness</li>
        </ul>
        
        <h4>Memory BIST</h4>
        <p>Testing SRAM structures within the RISC-V processor:</p>
        <ul>
          <li><strong>MBIST Architecture</strong>: Building memory test infrastructure</li>
          <li><strong>MBIST Controllers</strong>: Implementing test sequence generation</li>
          <li><strong>Test Algorithms</strong>: March tests, checkerboard patterns, and other test sequences</li>
          <li><strong>Repair Mechanisms</strong>: Implementing redundancy for yield improvement</li>
          <li><strong>At-Speed Testing</strong>: Verifying memory performance</li>
          <li><strong>Memory Fault Models</strong>: Addressing various memory defect types</li>
        </ul>
        
        <h4>Boundary Scan (JTAG)</h4>
        <p>Implementing IEEE 1149.1 for board-level testing:</p>
        <ul>
          <li><strong>JTAG TAP Controller</strong>: Implementing the test access port state machine</li>
          <li><strong>Boundary Scan Cells</strong>: Adding I/O testing capabilities</li>
          <li><strong>JTAG Instructions</strong>: Standard and custom test operations</li>
          <li><strong>Integration with RISC-V Debug</strong>: Leveraging JTAG for processor debugging</li>
          <li><strong>Boundary Scan Description Language (BSDL)</strong>: Documenting the implementation</li>
        </ul>
        
        <h4>DFT for At-Speed Testing</h4>
        <p>Verifying dynamic operation at full speed:</p>
        <ul>
          <li><strong>Launch-Capture Testing</strong>: Using scan for at-speed verification</li>
          <li><strong>Clock Control</strong>: Generating test clocks for dynamic testing</li>
          <li><strong>PLL Testing</strong>: Verifying clock generation circuitry</li>
          <li><strong>Critical Path Testing</strong>: Focusing on timing-critical parts of the design</li>
          <li><strong>Test Power Management</strong>: Controlling power during high-speed tests</li>
        </ul>
      `
    },
    {
      id: "14.4",
      title: "Power Optimization",
      content: `
        <h3>Achieving Energy-Efficient RISC-V Processors</h3>
        <p>Power optimization techniques are essential for creating competitive RISC-V implementations, especially for battery-powered and thermally-constrained applications.</p>
        
        <h4>Dynamic Power Reduction Techniques</h4>
        <p>Minimizing power consumption during active operation:</p>
        <ul>
          <li><strong>Clock Gating</strong>: Disabling clocks to unused circuits</li>
          <li><strong>Operand Isolation</strong>: Preventing unnecessary switching in datapaths</li>
          <li><strong>Pipelining</strong>: Reducing logic depth to enable lower voltage operation</li>
          <li><strong>Logic Restructuring</strong>: Optimizing for reduced switching activity</li>
          <li><strong>Memory Access Optimization</strong>: Minimizing energy-intensive memory operations</li>
          <li><strong>Bus Encoding</strong>: Reducing transitions on high-capacitance nets</li>
        </ul>
        
        <div style="text-align: center; margin: 20px 0;">
          <img src="https://i.imgur.com/c2OYfva.png" alt="Power Optimization" style="max-width: 700px; width: 100%;">
          <p><em>Power optimization techniques for RISC-V processors</em></p>
        </div>
        
        <h4>Static Power Management</h4>
        <p>Controlling leakage power consumption:</p>
        <ul>
          <li><strong>Multi-Vt Cell Strategy</strong>: Using high-Vt cells in non-critical paths</li>
          <li><strong>Power Gating</strong>: Shutting down power to unused blocks</li>
          <li><strong>Retention Strategies</strong>: Preserving state while minimizing leakage</li>
          <li><strong>Biasing Techniques</strong>: Applying body bias to control threshold voltage</li>
          <li><strong>Channel Length Optimization</strong>: Using longer channel devices for less leakage</li>
        </ul>
        
        <h4>Power Domains and Isolation</h4>
        <p>Implementing sophisticated power management schemes:</p>
        <ul>
          <li><strong>Multiple Voltage Domains</strong>: Partitioning the design into power regions</li>
          <li><strong>Level Shifters</strong>: Interfacing between different voltage domains</li>
          <li><strong>Isolation Cells</strong>: Preventing signal corruption during power transitions</li>
          <li><strong>Retention Registers</strong>: Preserving critical state during power gating</li>
          <li><strong>Power Controllers</strong>: Sequencing and managing power state transitions</li>
          <li><strong>Always-On Domains</strong>: Maintaining critical functionality</li>
        </ul>
        
        <h4>Clock Gating Strategies</h4>
        <p>Advanced approaches to clock power reduction:</p>
        <ul>
          <li><strong>Fine-Grained Clock Gating</strong>: Individual register or small block control</li>
          <li><strong>Hierarchical Clock Gating</strong>: Multi-level control for efficient switching</li>
          <li><strong>Activity-Based Gating</strong>: Dynamic enabling based on operations</li>
          <li><strong>Architectural Clock Gating</strong>: Instruction-aware power management</li>
          <li><strong>Glitch-Free Clock Gating</strong>: Preventing timing hazards</li>
        </ul>
        
        <h4>Power-Aware Place and Route</h4>
        <p>Physical implementation for power efficiency:</p>
        <ul>
          <li><strong>Power Grid Optimization</strong>: Balancing IR drop and routing resources</li>
          <li><strong>Clock Tree Power Optimization</strong>: Minimizing clock network power</li>
          <li><strong>Placement for Reduced Wire Length</strong>: Minimizing capacitance</li>
          <li><strong>Thermal-Aware Placement</strong>: Distributing heat generators</li>
          <li><strong>Power-Driven Routing</strong>: Considering power in routing decisions</li>
          <li><strong>Integrated Power Analysis</strong>: In-design power estimation and optimization</li>
        </ul>
      `
    },
    {
      id: "14.5",
      title: "Open-Source PDKs and ASIC Flow",
      content: `
        <h3>Democratizing RISC-V Silicon Implementation</h3>
        <p>Open-source Process Design Kits (PDKs) and ASIC design flows are enabling broader access to custom silicon implementation for RISC-V projects.</p>
        
        <h4>SkyWater 130nm PDK</h4>
        <p>The first fully open-source PDK for physical implementation:</p>
        <ul>
          <li><strong>Open-Source License</strong>: Apache 2.0 licensed PDK developed by Google and SkyWater Technology</li>
          <li><strong>130nm Technology</strong>: Mature node with reasonable performance and cost</li>
          <li><strong>Standard Cell Libraries</strong>: Fully characterized digital standard cells</li>
          <li><strong>Special Cells</strong>: I/O cells, memory compilers, and analog primitives</li>
          <li><strong>Community Support</strong>: Growing ecosystem of users and tools</li>
          <li><strong>Manufacturing Access</strong>: Multiple paths to silicon fabrication</li>
        </ul>
        
        <div style="text-align: center; margin: 20px 0;">
          <img src="https://i.imgur.com/aPkzxLh.png" alt="Open PDK Flow" style="max-width: 700px; width: 100%;">
          <p><em>Open-source ASIC implementation flow for RISC-V processors</em></p>
        </div>
        
        <h4>Google/efabless Flow</h4>
        <p>Open-source chip design and fabrication initiative:</p>
        <ul>
          <li><strong>Open MPW Program</strong>: Multi-project wafer shuttles with sponsored fabrication</li>
          <li><strong>Caravel Harness</strong>: Standard SoC template with management core</li>
          <li><strong>Submission Process</strong>: Standardized verification and integration flow</li>
          <li><strong>Community Designs</strong>: Growing repository of open-source silicon</li>
          <li><strong>RISC-V Focus</strong>: Many successful RISC-V based designs fabricated</li>
        </ul>
        
        <h4>OpenLANE Automation</h4>
        <p>End-to-end open-source ASIC implementation flow:</p>
        <ul>
          <li><strong>RTL-to-GDSII Flow</strong>: Complete automation from Verilog to final layout</li>
          <li><strong>Tool Integration</strong>: Coordinating open-source EDA tools</li>
          <li><strong>Design Exploration</strong>: Automated configuration for best results</li>
          <li><strong>DRC/LVS Sign-off</strong>: Integrated physical verification</li>
          <li><strong>RISC-V Success</strong>: Multiple RISC-V implementations demonstrated</li>
          <li><strong>Active Development</strong>: Continuous improvement and feature additions</li>
        </ul>
        
        <h4>OpenROAD Project</h4>
        <p>Academic-led initiative for open-source physical design:</p>
        <ul>
          <li><strong>DARPA-funded Project</strong>: Creating industry-competitive open tools</li>
          <li><strong>Unified Database</strong>: Common data model for consistent tool interaction</li>
          <li><strong>Machine Learning Integration</strong>: AI-assisted optimization</li>
          <li><strong>Advanced Algorithms</strong>: Modern approaches to physical design challenges</li>
          <li><strong>Multi-Node Support</strong>: Expanding beyond 130nm to other process nodes</li>
        </ul>
        
        <h4>Tapeout Considerations</h4>
        <p>Practical aspects of fabricating a RISC-V chip:</p>
        <ul>
          <li><strong>Cost Factors</strong>: Understanding NRE, masks, testing, and packaging expenses</li>
          <li><strong>Shuttle Options</strong>: Multi-project wafer opportunities for cost sharing</li>
          <li><strong>Timeline Planning</strong>: Typical schedules from design to silicon</li>
          <li><strong>Design Preparation</strong>: Final verification and validation before submission</li>
          <li><strong>Post-Silicon Validation</strong>: Testing methodologies after fabrication</li>
          <li><strong>Packaging Choices</strong>: Options from QFN to flip-chip and beyond</li>
        </ul>
      `
    }
  ],
  examples: [
    {
      id: "example14_1",
      title: "Clock Gating Implementation for RISC-V Pipeline",
      description: "SystemVerilog implementation of fine-grained clock gating in a RISC-V pipeline",
      code: `module pipeline_clock_gating (
  input  logic        clk_in,
  input  logic        rst_n,
  input  logic [4:0]  enable_stages,  // One bit per pipeline stage
  input  logic        sleep_mode,     // Global sleep signal
  output logic [4:0]  clk_gated       // Gated clocks for each stage
);

  // Individual integrated clock gates for each pipeline stage
  // Using synchronous enable for glitch-free clock gating
  
  // Fetch stage clock gating
  logic fetch_enable_latched;
  
  always_latch begin
    if (~clk_in)
      fetch_enable_latched <= enable_stages[0] & ~sleep_mode;
  end
  
  assign clk_gated[0] = clk_in & fetch_enable_latched;
  
  // Decode stage clock gating
  logic decode_enable_latched;
  
  always_latch begin
    if (~clk_in)
      decode_enable_latched <= enable_stages[1] & ~sleep_mode;
  end
  
  assign clk_gated[1] = clk_in & decode_enable_latched;
  
  // Execute stage clock gating
  logic execute_enable_latched;
  
  always_latch begin
    if (~clk_in)
      execute_enable_latched <= enable_stages[2] & ~sleep_mode;
  end
  
  assign clk_gated[2] = clk_in & execute_enable_latched;
  
  // Memory stage clock gating
  logic memory_enable_latched;
  
  always_latch begin
    if (~clk_in)
      memory_enable_latched <= enable_stages[3] & ~sleep_mode;
  end
  
  assign clk_gated[3] = clk_in & memory_enable_latched;
  
  // Writeback stage clock gating
  logic writeback_enable_latched;
  
  always_latch begin
    if (~clk_in)
      writeback_enable_latched <= enable_stages[4] & ~sleep_mode;
  end
  
  assign clk_gated[4] = clk_in & writeback_enable_latched;

endmodule`,
    },
    {
      id: "example14_2",
      title: "Power Domain Crossing Logic for RISC-V SoC",
      description: "Example of level shifters and isolation cells for power domain crossings",
      code: `module power_domain_interface (
  // Always-on domain signals (VDD_ALWAYS_ON)
  input  logic        clk_aon,
  input  logic        rst_n_aon,
  input  logic        power_on_core,     // Control signal to power on CPU domain
  input  logic [31:0] data_to_cpu,       // Data going to CPU domain
  output logic [31:0] data_from_cpu,     // Data coming from CPU domain
  
  // CPU domain signals (VDD_CPU - can be powered down)
  input  logic        clk_cpu,
  input  logic        rst_n_cpu,
  output logic [31:0] cpu_data_in,       // Connected to CPU input
  input  logic [31:0] cpu_data_out       // Connected to CPU output
);

  // Isolation control - active low when CPU domain is powered
  logic iso_en_n;
  assign iso_en_n = power_on_core;
  
  // Level shifter and isolation for data going to CPU domain
  // (from always-on to CPU domain)
  // In real implementation, these would be special cells from library
  genvar i;
  generate
    for (i = 0; i < 32; i++) begin : level_shift_to_cpu
      // Level shifter (from VDD_ALWAYS_ON to VDD_CPU)
      level_shifter_up ls_to_cpu (
        .data_in(data_to_cpu[i]),       // Always-on domain
        .data_out(cpu_data_in[i]),      // CPU domain
        .vdd_in(1'b1),                  // Always-on domain is powered
        .vdd_out(power_on_core)         // CPU domain power control
      );
    end
  endgenerate
  
  // Level shifter and isolation for data coming from CPU domain
  // (from CPU to always-on domain)
  generate
    for (i = 0; i < 32; i++) begin : level_shift_from_cpu
      // Isolation cell (holds safe value when CPU domain is off)
      isolation_cell iso_from_cpu (
        .data_in(cpu_data_out[i]),       // CPU domain (potentially unpowered)
        .data_out(iso_data[i]),          // Isolated output
        .iso_en_n(iso_en_n),             // Isolation control (active low)
        .safe_value(1'b0)                // Safe value when isolated
      );
      
      // Level shifter (from VDD_CPU to VDD_ALWAYS_ON)
      level_shifter_down ls_from_cpu (
        .data_in(iso_data[i]),          // Isolated CPU domain data
        .data_out(data_from_cpu[i]),    // Always-on domain
        .vdd_in(power_on_core),         // CPU domain power control
        .vdd_out(1'b1)                  // Always-on domain is powered
      );
    end
  endgenerate
  
  // Retention register example for saving state when powering down
  logic [31:0] retention_reg;
  
  always_ff @(posedge clk_aon or negedge rst_n_aon) begin
    if (!rst_n_aon) begin
      retention_reg <= 32'h0;
    end
    else if (!power_on_core) begin
      // Save state from CPU when powering down
      retention_reg <= data_from_cpu;
    end
  end

  // Power state controller (simplified)
  typedef enum logic [1:0] {
    POWER_OFF = 2'b00,
    POWER_UP  = 2'b01,
    POWER_ON  = 2'b10,
    POWER_DOWN= 2'b11
  } power_state_t;
  
  power_state_t current_state, next_state;
  
  // Power state machine
  always_ff @(posedge clk_aon or negedge rst_n_aon) begin
    if (!rst_n_aon)
      current_state <= POWER_OFF;
    else
      current_state <= next_state;
  end
  
  // Power state transitions
  always_comb begin
    next_state = current_state;
    
    case (current_state)
      POWER_OFF: if (power_on_core) next_state = POWER_UP;
      POWER_UP:  next_state = POWER_ON;  // Simple transition, could add delay
      POWER_ON:  if (!power_on_core) next_state = POWER_DOWN;
      POWER_DOWN: next_state = POWER_OFF; // Simple transition, could add delay
    endcase
  end

endmodule

// Note: These modules would typically be provided by the standard cell library
// They are simplified here for illustration
module level_shifter_up (
  input  logic data_in,
  output logic data_out,
  input  logic vdd_in,
  input  logic vdd_out
);
  assign data_out = vdd_out ? data_in : 1'b0;
endmodule

module level_shifter_down (
  input  logic data_in,
  output logic data_out,
  input  logic vdd_in,
  input  logic vdd_out
);
  assign data_out = vdd_out ? (vdd_in ? data_in : 1'b0) : 1'b0;
endmodule

module isolation_cell (
  input  logic data_in,
  output logic data_out,
  input  logic iso_en_n,
  input  logic safe_value
);
  assign data_out = iso_en_n ? data_in : safe_value;
endmodule`
    }
  ]
};

export default chapter14; 