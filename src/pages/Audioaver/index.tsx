import { useRef, useState } from 'react';

const AudioWaveform = () => {
    const canvasRef = useRef(null);
    const [canvasWidth,] = useState(800);  // 画布宽度
    const [canvasHeight,] = useState(200); // 画布高度
    let audioContext: any;
    let dataArray: any;

    const handleFileUpload = (event: any) => {
        const file = event.target.files[0];
        if (file) {
            audioContext = new ((window as any).AudioContext || (window as any).webkitAudioContext)();
            const reader = new FileReader();

            reader.onload = function (e) {
                audioContext.decodeAudioData(e!.target!.result, (buffer: any) => {
                    dataArray = buffer.getChannelData(0); // 获取左声道数据
                    drawRectWaveform();
                });
            };

            reader.readAsArrayBuffer(file);
        }
    };

    const drawRectWaveform = () => {
        const canvas: any = canvasRef.current;
        const canvasContext = canvas.getContext('2d');
        canvasContext.clearRect(0, 0, canvasWidth, canvasHeight);
        canvasContext.fillStyle = 'rgb(0, 0, 0)';

        const barWidth = 2;    // 每个矩形的宽度
        const gap = 1;         // 每个矩形之间的间隔
        const step = Math.ceil(dataArray.length / (canvasWidth / (barWidth + gap))); // 采样步长
        let x = 0;

        for (let i = 0; i < dataArray.length; i += step) {
            const v = dataArray[i] * 0.5; // 适当缩放波形高度
            // const y = (canvasHeight / 2) + (v * canvasHeight / 2);
            const height = Math.abs(v * canvasHeight); // 矩形高度

            canvasContext.fillStyle = 'rgb(0, 0, 255)';
            canvasContext.fillRect(x, canvasHeight / 2 - height / 2, barWidth, height);

            x += barWidth + gap;
        }
    };

    return (
        <div>
            <input type="file" onChange={handleFileUpload} accept="audio/*" />
            <canvas ref={canvasRef} width={canvasWidth} height={canvasHeight} />
        </div>
    );
};

export default AudioWaveform;
