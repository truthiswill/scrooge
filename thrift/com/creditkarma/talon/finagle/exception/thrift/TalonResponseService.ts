/**
 * Generated by Scrooge
 *   version: 4.13.0-SNAPSHOT
 *   rev: 5b0cb3ee0c7699372f2c21cf043ce2b0e7892346
 *   built at: 20170323-104603
 */
import thrift from 'thrift'
import {Thrift, Q} from 'thrift'

import { TalonResponse } from './TalonResponse'
import { TalonResponseException } from './TalonResponseException'


export class TalonResponseServiceInternalTalonResponseArgs {
    constructor(args?) {
        if (args) {
        }
    }

    public read(input) {
        input.readStructBegin()
        while (true) {
            const {fname, ftype, fid} = input.readFieldBegin()
            if (ftype === Thrift.Type.STOP) {
                break
            }
            switch (fid) {
                default:
                    input.skip(ftype)
            }
            input.readFieldEnd()
        }
        input.readStructEnd()
        return
    }

    public write(output) {
        output.writeStructBegin("TalonResponseServiceInternalTalonResponseArgs")
        output.writeFieldStop()
        output.writeStructEnd()
        return
    }
}
export class TalonResponseServiceInternalTalonResponseResult {
    public success: void
    public ex: TalonResponseException
    constructor(args?) {
        if (args) {
            if (args.ex !== undefined && args.ex !== null) {
                this.ex = args.ex
            } else {
                throw new Thrift.TProtocolException(Thrift.TProtocolExceptionType.UNKNOWN, 'Required field ex is unset!')
            }
        }
    }

    public read(input) {
        input.readStructBegin()
        while (true) {
            const {fname, ftype, fid} = input.readFieldBegin()
            if (ftype === Thrift.Type.STOP) {
                break
            }
            switch (fid) {
                case 1:
                    this.ex = (() => {
                        const struct = new TalonResponseException()
                        struct.read(input)
                        return struct
                    })()
                    break
                default:
                    input.skip(ftype)
            }
            input.readFieldEnd()
        }
        input.readStructEnd()
        return
    }

    public write(output) {
        output.writeStructBegin("TalonResponseServiceInternalTalonResponseResult")
        if (this.ex !== null && this.ex !== undefined) {
            if (this.ex !== null) {
                const ex_item = this.ex
                output.writeFieldBegin("ex", Thrift.Type.STRUCT, 1)
                ex_item.write(output)
                output.writeFieldEnd()
            }
        }
        output.writeFieldStop()
        output.writeStructEnd()
        return
    }
}
export class Client {
    public output
    public pClass
    private _seqid
    public _reqs

    constructor(output: Transport, pClass: Protocol) {
        this.output = output
        this.pClass = pClass
        this._seqid = 0
        this._reqs = {}
    }

    public seqid() {
        return this._seqid
    }

    public new_seqid() {
        return this._seqid += 1
    }

        public internalTalonResponse(callback?): Promise<void>|undefined {
        this._seqid = this.new_seqid()
        if (callback === undefined) {
            let defer = Q.defer()
            this._reqs[this.seqid()] = function(error, result) {
                if (error) {
                    defer.reject(error)
                } else {
                    defer.resolve(result)
                }
            }
            this.send_internalTalonResponse()
            return defer.promise
        } else {
            this._reqs[this.seqid()] = callback
            this.send_internalTalonResponse()
        }
    }

    public send_internalTalonResponse() {
        const output = new this.pClass(this.output)
        output.writeMessageBegin("internalTalonResponse", Thrift.MessageType.CALL, this.seqid())
        const args = new TalonResponseServiceInternalTalonResponseArgs({  })
        
        args.write(output)
        output.writeMessageEnd()
        return this.output.flush()
    }

    public recv_internalTalonResponse(input, mtype, rseqid) {
        const noop = () => null
        let callback = this._reqs[rseqid] || noop
        delete this._reqs[rseqid]
        if (mtype === Thrift.MessageType.EXCEPTION) {
            const x = new Thrift.TApplicationException()
            x.read(input)
            input.readMessageEnd()
            return callback(x)
        }
        const result = new TalonResponseServiceInternalTalonResponseResult()
        result.read(input)
        input.readMessageEnd()

        if (result.ex != null) {
            return callback(result.ex)
        }
        if (result.success != null) {
            return callback(null, result.success)
        }
        return callback("internalTalonResponse failed: unknown result")
    }
    
}

export class Processor {
    private _handler

    constructor(handler) {
        this._handler = handler
    }

    public process(input, output) {
        const r = input.readMessageBegin()
        if (this["process_" + r.fname]) {
            return this["process_" + r.fname].call(this, r.rseqid, input, output)
        } else {
            input.skip(Thrift.Type.STRUCT)
            input.readMessageEnd()
            const err = `Unknown function ${r.fname}`
            const x = new Thrift.TApplicationException(Thrift.TApplicationExceptionType.UNKNOWN_METHOD, err)
            output.writeMessageBegin(r.fname, Thrift.MessageType.EXCEPTION, r.rseqid)
            x.write(output)
            output.writeMessageEnd()
            output.flush()
        }
    }

    public process_internalTalonResponse(seqid, input, output) {
        const args = new TalonResponseServiceInternalTalonResponseArgs()
        args.read(input)
        input.readMessageEnd()
        if (this._handler.internalTalonResponse.length === 0) {
            Q.fcall(this._handler.internalTalonResponse).then((data) => {
                const result = new TalonResponseServiceInternalTalonResponseResult({success: data})
                output.writeMessageBegin("internalTalonResponse", Thrift.MessageType.REPLY, seqid)
                result.write(output)
                output.writeMessageEnd()
                output.flush()
            }, (err) => {
                const result = new Thrift.TApplicationException(Thrift.TApplicationExceptionType.UNKNOWN, err.message)
                output.writeMessageBegin("internalTalonResponse", Thrift.MessageType.EXCEPTION, seqid)
                result.write(output)
                output.writeMessageEnd()
                output.flush()
            })
        } else {
            this._handler.internalTalonResponse((err, data) => {
                let result
                if (err == null) {
                    result = new TalonResponseServiceInternalTalonResponseResult((err != null ? err : {success: data}))
                    output.writeMessageBegin("internalTalonResponse", Thrift.MessageType.REPLY, seqid)
                } else {
                    result = new Thrift.TApplicationException(Thrift.TApplicationExceptionType.UNKNOWN, err.message)
                    output.writeMessageBegin("internalTalonResponse", Thrift.MessageType.EXCEPTION, seqid)
                }
                result.write(output)
                output.writeMessageEnd()
                output.flush()
            })
        }
    }
    
}
