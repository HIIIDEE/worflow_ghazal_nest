declare module 'react-qr-barcode-scanner' {
    import { Component } from 'react';

    export interface BarcodeScannerComponentProps {
        width?: number | string;
        height?: number | string;
        onUpdate: (err: any, result: any) => void;
        facingMode?: 'environment' | 'user';
        torch?: boolean;
        delay?: number;
        videoStyle?: any;
        containerStyle?: any;
    }

    export default class BarcodeScannerComponent extends Component<BarcodeScannerComponentProps> { }
}
