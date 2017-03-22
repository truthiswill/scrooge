/**
 * Generated by Scrooge
 *   version: 4.13.0-SNAPSHOT
 *   rev: eb527853cd68a47db6989d5d8ad99cf9fd1e2a1b
 *   built at: 20170322-114506
 */


import thrift from 'thrift'
import {Q, Thrift} from 'thrift'



export class CreateRequestContext {
    public name: string
    constructor(args?) {
    }

    public read(input) {
        input.readStructBegin()
        while (true) {
            const {fname, ftype, fid} = input.readFieldBegin()
            if (ftype === Thrift.Type.STOP) {
                break
            }
            input.skip(ftype)
            input.readFieldEnd()
        }
        input.readStructEnd()
        return
    }

    public write(output) {
        output.writeStructBegin("CreateRequestContext")
        if (this.name !== null && this.name !== undefined) {
            // writing name
            if (this.name !== null) {
                const name_item = this.name
                output.writeFieldBegin("name", Thrift.Type.STRING, 1)
                // isList: false, isSet: false, isMap: false, isStruct: false, isEnum: false, isBase: ?
                output.writeString(name_item)
                output.writeFieldEnd()
            }
        }
        output.writeFieldStop()
        output.writeStructEnd()
        return
    }
}