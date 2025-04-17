const URLSITE = "https://verigeek.xyz";

export default URLSITE;


const mocksBlogs = [
      {
                id: 6,
                title: 'SystemVerilog for FPGA Design Verification',
                link: 'https://www.intel.com/content/www/us/en/docs/programmable/683671/current/systemverilog-support.html',
                pubDate: '2023-11-02T13:45:00Z',
                source: 'IEEE Spectrum',
                category: 'VLSI',
                description: 'SystemVerilog offers powerful features for FPGA design verification, helping engineers ensure correct functionality before hardware implementation.',
                image: 'https://tse3.mm.bing.net/th?id=OIP.EgPsTipFoMIIu77aDfj_mgHaEa&pid=Api&P=0&h=180'
              },
              {
                id: 10,
                title: 'Next-Generation Silicon Photonics',
                link: 'https://www.intel.com/content/www/us/en/architecture-and-technology/silicon-photonics/silicon-photonics-overview.html',
                pubDate: '2023-11-08T08:10:00Z',
                source: 'IEEE Spectrum',
                category: 'VLSI',
                description: 'Silicon photonics is revolutionizing data center interconnects and promises to enable new architectures for optical computing.',
                image: 'https://tse4.mm.bing.net/th?id=OIP.dHU7N0K9osbYg2DjRhTuawAAAA&pid=Api&P=0&h=180'
              },
              {
                id: 12,
                title: 'Advances in EDA Tools for Advanced Node Designs',
                link: 'https://www.cadence.com/en_US/home/tools/custom-ic-analog-rf-design.html',
                pubDate: new Date(Date.now() - 5400000).toISOString(), // 1.5 hours ago
                source: 'Semiconductor Engineering',
                category: 'VLSI',
                description: 'Electronic Design Automation tools are evolving to address the complexities of designing for 3nm and below process nodes.',
                image: 'https://tse3.mm.bing.net/th?id=OIP.4JPZWCwrjSlBtY0P9rVwsAHaEK&pid=Api&P=0&h=180',
                isNew: true
              },
              {
                id: 13,
                title: 'Understanding FinFET Technology',
                link: 'https://www.synopsys.com/glossary/what-is-finfet.html',
                pubDate: '2023-11-14T09:15:00Z',
                source: 'Synopsys Blog',
                category: 'VLSI',
                description: 'FinFET technology has revolutionized transistor design, offering better performance and lower power consumption for modern semiconductor devices.',
                image: 'https://tse4.mm.bing.net/th?id=OIP.X37fwrrZlZNrVOI4h5uPpgHaEI&pid=Api&P=0&h=180'
              },
              {
                id: 14,
                title: 'The Impact of Quantum Computing on VLSI Design',
                link: 'https://spectrum.ieee.org/quantum-computing',
                pubDate: '2023-11-04T11:30:00Z',
                source: 'IEEE Spectrum',
                category: 'VLSI',
                description: 'Quantum computing is poised to transform VLSI design methodologies, introducing new paradigms for circuit simulation and verification.',
                image: 'https://tse3.mm.bing.net/th?id=OIP.Kz5EmGV3JiGU8zwp3isIOQHaEP&pid=Api&P=0&h=180'
              },
              
              // FPGA blogs
              {
                id: 2,
                title: 'The Future of FPGAs in Edge Computing',
                link: 'https://www.eetimes.com/lattice-targets-low-power-edge-ai-with-new-small-fpga/',
                pubDate: '2023-09-22T14:20:00Z',
                source: 'EE Times',
                category: 'FPGA',
                description: 'As edge computing continues to grow, FPGAs are becoming increasingly important for real-time processing and low-latency applications.',
                image: 'https://tse1.mm.bing.net/th?id=OIP.73i22c7Jmu2Z26caAhrfhgHaEq&pid=Api&P=0&h=180'
              },
              {
                id: 7,
                title: 'Exploring the AMD Acquisition of Xilinx',
                link: 'https://www.amd.com/en/corporate/xilinx-acquisition',
                pubDate: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
                source: 'EE Times',
                category: 'FPGA',
                description: 'AMD\'s acquisition of Xilinx creates a powerhouse in the FPGA market, with implications for product roadmaps and competitive landscape.',
                image: 'https://tse3.mm.bing.net/th?id=OIP.zSmanO1kM358s9T6bXtqhwHaEK&pid=Api&P=0&h=180',
                isNew: true
              },
              {
                id: 15,
                title: 'High-Level Synthesis for FPGAs',
                link: 'https://www.xilinx.com/products/design-tools/vitis/vitis-hls.html',
                pubDate: '2023-10-18T13:40:00Z',
                source: 'FPGA Journal',
                category: 'FPGA',
                description: 'High-Level Synthesis tools are changing how engineers approach FPGA design, enabling C/C++ code to be directly implemented in hardware.',
                image: 'https://tse3.mm.bing.net/th?id=OIP.oGO7TgQn74v45BoZtmwC7QHaE8&pid=Api&P=0&h=180'
              },
              {
                id: 16,
                title: 'Partial Reconfiguration Techniques in Modern FPGAs',
                link: 'https://www.intel.com/content/www/us/en/programmable/documentation/lat1578341945488.html',
                pubDate: '2023-11-07T10:25:00Z',
                source: 'Intel FPGA',
                category: 'FPGA',
                description: 'Partial reconfiguration allows portions of an FPGA to be reconfigured while the rest of the device continues to operate, enabling dynamic system adaptation.',
                image: 'https://tse2.mm.bing.net/th?id=OIP.5ZNwCog-DOqEX_pf4OYIOQHaFC&pid=Api&P=0&h=180'
              },
              {
                id: 17,
                title: 'FPGA Security Considerations',
                link: 'https://www.design-reuse.com/articles/48257/fpga-security.html',
                pubDate: '2023-10-22T09:30:00Z',
                source: 'Design & Reuse',
                category: 'FPGA',
                description: 'As FPGAs become more prevalent in critical infrastructure, understanding and implementing robust security measures is essential for system integrity.',
                image: 'https://tse1.mm.bing.net/th?id=OIP.nDepN5kschboP1d716U8CgHaE8&pid=Api&P=0&h=180'
              },
              
              // DIY Electronics blogs
              {
                id: 3,
                title: 'Build Your Own Logic Analyzer with Raspberry Pi',
                link: 'https://r.search.yahoo.com/_ylt=Awr1TVHOVPJnCQIA84S7HAx.;_ylu=Y29sbwNzZzMEcG9zAzYEdnRpZAMEc2VjA3Ny/RV=2/RE=1745144271/RO=10/RU=https%3a%2f%2fhackaday.com%2f2023%2f08%2f31%2flogic-analyzers-tapping-into-raspberry-pi-secrets%2f/RK=2/RS=x8zMOc_50N4Ad39peNRnZgZraDg-',
                pubDate: '2023-11-05T08:40:00Z',
                source: 'Hackaday',
                category: 'DIY Electronics',
                description: 'Learn how to build a cost-effective logic analyzer using Raspberry Pi and some basic components to debug your digital circuits.',
                image: 'https://tse2.mm.bing.net/th?id=OIP.DZe6p211sJOBGJEojRttWgHaE7&pid=Api&P=0&h=180'
              },
              {
                id: 11,
                title: 'Building a Retro Computing Platform with Modern FPGAs',
                link: 'https://github.com/MiSTer-devel/Main_MiSTer/wiki',
                pubDate: '2023-10-25T16:40:00Z',
                source: 'Hackaday',
                category: 'DIY Electronics',
                description: 'Learn how to recreate vintage computer architectures using modern FPGA development boards for a blend of nostalgia and cutting-edge technology.',
                image: 'https://cdna.artstation.com/p/assets/images/images/018/894/572/large/gil-monteiro-1.jpg?1561133409'
              },
              {
                id: 18,
                title: 'Arduino-Based Spectrum Analyzer',
                link: 'https://create.arduino.cc/projecthub/mircemk/diy-audio-spectrum-analyzer-with-rgb-led-strip-71bc1e',
                pubDate: '2023-11-10T14:20:00Z',
                source: 'Arduino Project Hub',
                category: 'DIY Electronics',
                description: 'Create your own audio spectrum analyzer with RGB LED visualization using an Arduino and a few common electronic components.',
                image: 'https://tse2.mm.bing.net/th?id=OIP.Mu8n68KvboW76Jrt3vf5aAHaEK&pid=Api&P=0&h=180'
              },
              {
                id: 19,
                title: 'DIY Electronic Load for Testing Power Supplies',
                link: 'https://hackaday.io/project/180636-diy-electronic-load',
                pubDate: '2023-10-12T11:15:00Z',
                source: 'Hackaday.io',
                category: 'DIY Electronics',
                description: 'Build a versatile electronic load capable of testing power supplies, batteries, and other current sources with adjustable parameters.',
                image: 'https://tse3.mm.bing.net/th?id=OIP.psdp6S53gwaa2nq6rboaxAHaFc&pid=Api&P=0&h=180'
              },
              {
                id: 20,
                title: 'ESP32 Weather Station with E-Ink Display',
                link: 'https://randomnerdtutorials.com/esp32-esp8266-e-paper-display-spi/',
                pubDate: '2023-11-02T15:45:00Z',
                source: 'Random Nerd Tutorials',
                category: 'DIY Electronics',
                description: 'Create a low-power weather station using an ESP32 microcontroller and an e-ink display that can run for months on a single battery charge.',
                image: 'https://tse1.mm.bing.net/th?id=OIP.SzIvTmvLM7csgsuN4KcGCgHaEu&pid=Api&P=0&h=180'
              },
              
              // Electrical Engineering blogs
              {
                id: 4,
                title: 'Understanding Power Integrity in PCB Design',
                link: 'https://www.intel.com/content/www/us/en/developer/articles/technical/power-delivery-for-intel-xeon-phi-processor.html',
                pubDate: '2023-10-30T11:15:00Z',
                source: 'All About Circuits',
                category: 'Electrical Engineering',
                description: 'Power integrity is a critical aspect of PCB design that ensures your circuit receives clean and stable power, essential for reliable operation.',
                image: 'https://tse1.mm.bing.net/th?id=OIP.vsCLQJ03vliSTnK91wrI1wHaEo&pid=Api&P=0&h=180'
              },
              {
                id: 21,
                title: 'Thermal Management in High-Power Electronics',
                link: 'https://www.electronics-cooling.com/2017/07/thermal-management-high-power-electronics/',
                pubDate: '2023-10-14T09:20:00Z',
                source: 'Electronics Cooling',
                category: 'Electrical Engineering',
                description: 'Effective thermal management is crucial for high-power electronic systems to ensure reliability and performance over their operational lifetime.',
                image: 'https://tse2.mm.bing.net/th?id=OIP.KoBBf9r8NYHLSP-nCGS8OQAAAA&pid=Api&P=0&h=180'
              },
              {
                id: 22,
                title: 'Signal Integrity Analysis for High-Speed Interfaces',
                link: 'https://www.keysight.com/us/en/assets/7018-03406/application-notes/5989-5699.pdf',
                pubDate: '2023-11-09T14:30:00Z',
                source: 'Keysight Technologies',
                category: 'Electrical Engineering',
                description: 'High-speed digital interfaces require careful signal integrity analysis to ensure reliable data transmission across PCB traces and connectors.',
                image: 'https://tse3.mm.bing.net/th?id=OIP.SDihwWZT1nmtETJm7ZS0PQHaEK&pid=Api&P=0&h=180'
              },
              {
                id: 23,
                title: 'EMC/EMI Design Considerations for Electronic Products',
                link: 'https://incompliancemag.com/article/emc-design-fundamentals/',
                pubDate: '2023-10-28T12:45:00Z',
                source: 'In Compliance Magazine',
                category: 'Electrical Engineering',
                description: 'Electromagnetic compatibility (EMC) and interference (EMI) are critical design considerations for ensuring electronic products meet regulatory requirements.',
                image: 'https://tse1.mm.bing.net/th?id=OIP.mEEh6Aruk3y6XTm2unMSSwAAAA&pid=Api&P=0&h=180'
              },
              {
                id: 24,
                title: 'Battery Management Systems for Electric Vehicles',
                link: 'https://www.ti.com/applications/automotive/hev-ev-powertrain/battery-management-system.html',
                pubDate: '2023-11-01T10:10:00Z',
                source: 'Texas Instruments',
                category: 'Electrical Engineering',
                description: 'Battery management systems (BMS) are essential for monitoring and controlling the state of lithium-ion battery packs in electric vehicles.',
                image: 'https://tse3.mm.bing.net/th?id=OIP.T-YbKFRTsw2dJhmNA-dX7gHaEv&pid=Api&P=0&h=180'
              },
              
              // Electronics Design blogs
              {
                id: 5,
                title: 'Advances in Analog-to-Digital Converters',
                link: 'https://www.analog.com/en/products/analog-to-digital-converters.html',
                pubDate: '2023-11-10T09:30:00Z',
                source: 'EDN Network',
                category: 'Electronics Design',
                description: 'Explore the latest innovations in ADC technology, including improved resolution, lower power consumption, and higher sampling rates.',
                image: 'https://tse2.mm.bing.net/th?id=OIP.XS5ZfOwso2I_U1W3Fwg-bQHaEK&pid=Api&P=0&h=180'
              },
              {
                id: 8,
                title: 'The Evolution of PCB Design Software',
                link: 'https://www.altium.com/solution/pcb-design-software',
                pubDate: new Date(Date.now() - 7200000).toISOString(), // 2 hours ago
                source: 'All About Circuits',
                category: 'Electronics Design',
                description: 'Modern PCB design software has evolved to include advanced features like simulation, collaborative workflows, and AI-powered routing assistance.',
                image: 'https://tse4.mm.bing.net/th?id=OIP.PVcV78klISs55AZ3i6mfJQHaE4&pid=Api&P=0&h=180',
                isNew: true
              },
              {
                id: 25,
                title: 'Designing Mixed-Signal Circuits for IoT Applications',
                link: 'https://www.maximintegrated.com/en/design/technical-documents/tutorials/7/7279.html',
                pubDate: '2023-11-05T11:20:00Z',
                source: 'Maxim Integrated',
                category: 'Electronics Design',
                description: 'IoT devices require optimized mixed-signal circuits to balance power consumption, performance, and connectivity requirements.',
                image: 'https://tse2.mm.bing.net/th?id=OIP.pBWPzXxQYnKmfSDW6WxsPgHaEc&pid=Api&P=0&h=180'
              },
              {
                id: 26,
                title: 'Low-Power Design Techniques for Wearable Electronics',
                link: 'https://www.eetimes.com/techniques-for-reducing-power-consumption-in-wearable-electronics/',
                pubDate: '2023-10-19T14:15:00Z',
                source: 'EE Times',
                category: 'Electronics Design',
                description: 'Wearable electronic devices demand ultra-low power consumption while maintaining functionality, requiring specialized design approaches.',
                image: 'https://tse1.mm.bing.net/th?id=OIP.K7qsJ3JxIIKIijC7fY9rPwHaEK&pid=Api&P=0&h=180'
              },
              {
                id: 27,
                title: 'RF Circuit Design Considerations for 5G Applications',
                link: 'https://www.keysight.com/us/en/assets/7018-06235/white-papers/5992-3309.pdf',
                pubDate: '2023-10-27T09:45:00Z',
                source: 'Keysight Technologies',
                category: 'Electronics Design',
                description: 'Designing RF circuits for 5G applications presents unique challenges in terms of bandwidth, power efficiency, and signal integrity.',
                image: 'https://tse3.mm.bing.net/th?id=OIP.azYQ1fw7-YNIaAiK__RL1gHaFf&pid=Api&P=0&h=180'
              },
              
              // Electronics blogs
              {
                id: 9,
                title: 'Embedded Machine Learning on Microcontrollers',
                link: 'https://www.tensorflow.org/lite/microcontrollers',
                pubDate: '2023-11-12T15:20:00Z',
                source: 'Embedded.com',
                category: 'Electronics',
                description: 'Implementing ML on microcontrollers opens new possibilities for edge computing with minimal power consumption and small form factors.',
                image: 'https://tse3.mm.bing.net/th?id=OIP.Rd7-fYT4aSZH8BiVg1LPJQHaEK&pid=Api&P=0&h=180'
              },
              {
                id: 28,
                title: 'The Role of GaN Semiconductors in Power Electronics',
                link: 'https://www.powerelectronicsnews.com/gallium-nitride-gan-the-future-of-power-semiconductors/',
                pubDate: '2023-11-08T10:45:00Z',
                source: 'Power Electronics News',
                category: 'Electronics',
                description: 'Gallium Nitride (GaN) semiconductors are transforming power electronics with higher efficiency and smaller form factors compared to silicon alternatives.',
                image: 'https://tse1.mm.bing.net/th?id=OIP.OhcY9wRYablTK5m5mLFxYgHaFS&pid=Api&P=0&h=180'
              },
              {
                id: 29,
                title: 'Open Hardware Platforms for Electronics Prototyping',
                link: 'https://www.openhardware.io/',
                pubDate: '2023-10-20T13:45:00Z',
                source: 'Open Hardware IO',
                category: 'Electronics',
                description: 'Open hardware platforms provide accessible resources for electronics prototyping, fostering innovation and collaboration in the maker community.',
                image: 'https://tse3.mm.bing.net/th?id=OIP.w4TbSxghBH67Ct8e7cnZXQHaEo&pid=Api&P=0&h=180'
              },
              {
                id: 30,
                title: 'Energy Harvesting Technologies for IoT Devices',
                link: 'https://www.mouser.com/applications/energy-harvesting-for-iot/',
                pubDate: '2023-11-03T09:15:00Z',
                source: 'Mouser Electronics',
                category: 'Electronics',
                description: 'Energy harvesting technologies enable IoT devices to operate without batteries by capturing energy from ambient sources like light, vibration, or heat.',
                image: 'https://tse2.mm.bing.net/th?id=OIP.Ov3nBvQBzNCl2MsES_rk1gHaEK&pid=Api&P=0&h=180'
              },
              {
                id: 31,
                title: 'Flexible and Printed Electronics Applications',
                link: 'https://www.idtechex.com/en/reports/printed-and-flexible-electronics/1',
                pubDate: '2023-10-31T11:30:00Z',
                source: 'IDTechEx',
                category: 'Electronics',
                description: 'Flexible and printed electronics enable new form factors and applications, from wearable sensors to rollable displays and smart packaging.',
                image: 'https://tse4.mm.bing.net/th?id=OIP.8K8FjZN_BBWiJzIZm4gESwHaEc&pid=Api&P=0&h=180'
              }
]
